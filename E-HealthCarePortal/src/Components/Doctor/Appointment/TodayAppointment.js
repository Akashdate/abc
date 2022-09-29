import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const TodayAppointment = (props) => {
  const [todayList, setTodayList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const showTodayAppointments = (id) => {
    console.log("hello " + id);
    axios
      .get(`${base_url}/doctor/${id}/patientsToday`, { headers: authHeader() })
      .then(
        (response) => {
          setTodayList(response.data);
          console.log(response.data);
        },
        (error) => {
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
        console.log("appointment cancelled successfully", response.data);
        toast.success("You have cancelled an appointment");
        setTodayList(
          todayList.filter((appointment) => appointment.id != appointment_id)
        );
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("Something went wrong");
      });
  };

  const storePatientId = (patientId) => {
    console.log(patientId);
    localStorage.setItem("patient", JSON.stringify(patientId));
  };

  useEffect(() => {
    showTodayAppointments(id);
  }, []);

  return (
    <div>
      {todayList.length == 0 ? (
        <h1>You have no appointments Today </h1>
      ) : (
        <div>
          <h3>Today's Appointments</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>

                <th>Time</th>
                <th>Mode of Appointment</th>

                <th>Payment Status</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todayList.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName} </td>
                  <td>{appointment.date} </td>
                  <td>{appointment.time} </td>
                  <td>{appointment.online ? "Online" : "Offline"} </td>
                  <td>{appointment.paymentStatus ? "Paid" : "Unpaid"}</td>

                  <td>
                    <Link to={`/doctor/today/treatmentPage/`}>
                      <button
                        className="btn btn-success ml-2"
                        onClick={storePatientId(appointment.patientId)}
                      >
                        Start
                      </button>
                    </Link>
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

export default TodayAppointment;
