import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const FutureAppointment = () => {
  const [futureList, setFutureList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const showFutureAppointments = (id) => {
    console.log("hello " + id);
    axios
      .get(`${base_url}/doctor/${id}/patientsFuture`, { headers: authHeader() })
      .then(
        (response) => {
          setFutureList(response.data);
          console.log(response.data);
        },
        (error) => {
          //error handling
          toast.error("Something went wrong !");
          console.log(error);
        }
      );
  };

  const CancelAppointment = (appointment_id) => {
    
    console.log("Printing id", id);
    axios
      .patch(`${base_url}/doctor/${id}/Appointment/${appointment_id}`, null, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("Your appointment is cancelled ", response.data);
        toast.success("You have cancelled an appointment");
        setFutureList(
          futureList.filter((appointment) => appointment.id != appointment_id)
        );
      })
      .catch((error) => {
        console.log("Something went wrong.. try again later", error);
        toast.error("Something went wrong.. try again later");
      });
  };

  useEffect(() => {
    showFutureAppointments(id);
  }, []);

  return (
    <div>
      {futureList.length == 0 ? (
        <h1>You don't any Future appointments </h1>
      ) : (
        <div>
          <h3>Future Appointments</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>

                <th>Time</th>
                <th>Appointment Status</th>
                <th>Mode of Appointment</th>

                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {futureList.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName} </td>
                  <td>{appointment.date} </td>
                  <td>{appointment.time} </td>
                  <td>{appointment.status}</td>
                  <td>{appointment.online ? "Online" : "Offline"} </td>
                  <td>{appointment.paymentStatus ? "Paid" : "Unpaid"}</td>

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

export default FutureAppointment;
