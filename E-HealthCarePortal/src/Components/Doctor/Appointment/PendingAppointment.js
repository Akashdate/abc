import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const PendingAppointment = () => {
  const [pendingList, setPendingList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const showPendingAppointments = (id) => {
    console.log("hello " + id);

    axios
      .get(`${base_url}/doctor/${id}/patientsRequest`, {
        headers: authHeader(),
      })
      .then(
        (response) => {
          setPendingList(response.data);
          console.log(response.data);
        },
        (error) => {
          toast.error("Something went wrong !");
          console.log(error);
        }
      );
  };

  const ConfirmAppointment = (appointment_id) => {
    console.log("Printing id", id);
    axios
      .patch(
        `${base_url}/doctor/${id}/confirmAppointment/${appointment_id}`,
        null,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("appointment confirmed successfully", response.data);
        toast.success("Your have confirmed an appointment");
        setPendingList(
          pendingList.filter((appointment) => appointment.id != appointment_id)
        );
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("Something went wrong, try again later");
      });
  };

  const CancelAppointment = (appointment_id) => {
    console.log("Printing id", id);
    axios
      .patch(`${base_url}/doctor/${id}/Appointment/${appointment_id}`, null, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("appointment cancelled successfully", response.data);
        toast.success("Your have cancelled an appointment");
        setPendingList(
          pendingList.filter((appointment) => appointment.id != appointment_id)
        );
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    showPendingAppointments(id);
  }, []);

  return (
    <div>
      {pendingList.length == 0 ? (
        <h1>You have no Pending appointments </h1>
      ) : (
        <div>
          <h3>Pending Appointments</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>

                <th>Time</th>
                <th>Appointment Status</th>
                <th>Mode of Appointment</th>

                <th>Payment Status</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingList.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName} </td>
                  <td>{appointment.date} </td>
                  <td>{appointment.time} </td>
                  <td>{appointment.status}</td>
                  <td>{appointment.online ? "Online" : "Offline"} </td>
                  <td>{appointment.paymentStatus ? "Paid" : "Unpaid"}</td>
                  <td>
                    <button
                      className="btn btn-info ml-2"
                      onClick={() => {
                        ConfirmAppointment(appointment.id);
                      }}
                    >
                      Confirm
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => {
                        CancelAppointment(appointment.id);
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default PendingAppointment;
