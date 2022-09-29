import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const ViewAppointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  const getAppointmentList = () => {
    axios
      .get(`${base_url}/patient/${id}/appointment`, { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
        setAppointmentList(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getAppointmentList();
  }, []);

  const handleDelete = (appointmentId) => {
    axios
      .patch(`${base_url}/patient/${id}/appointment/${appointmentId}`, null, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Appointment cancelled");
        setAppointmentList(
          appointmentList.map((app) => {
            if (app.id === appointmentId) {
              return { ...app, status: "Cancelled" };
            } else {
              return app;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <Link to={`/patient/bookAppointment`}>
          <button type="button" className="btn btn-info btn-lg m-1">
            Book Appointment
          </button>
        </Link>
      </div>
      <hr />
      <div>
        {appointmentList.length == 0 ? (
          <h1>You have no appointments </h1>
        ) : (
          <div>
            <h3>Your Appointments</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>DOCTOR NAME</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {appointmentList.reverse().map((appointment) => {
                  return (
                    <tr key={appointment.id}>
                      <td>{appointment.id} </td>
                      <td>{appointment.date} </td>
                      <td>{appointment.time} </td>
                      <td>{appointment.online ? "Online" : "Offline"} </td>
                      <td>{appointment.status} </td>
                      <td>{appointment.doctorName} </td>
                      <td>
                        {appointment.status != "Cancelled" && (
                          <button
                            className="btn btn-danger ml-2"
                            onClick={() => {
                              handleDelete(appointment.id);
                            }}
                          >
                            Cancel Appointment
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;
