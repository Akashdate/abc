import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const PatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const patientId = localStorage.getItem("patient");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  const showPatientDetails = (id, patientId) => {
    console.log("hello " + id);
    axios
      .get(`${base_url}/doctor/${id}/getPatientDetails/${patientId}`, {
        headers: authHeader(),
      })
      .then(
        (response) => {
          setPatientDetails(response.data);
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    showPatientDetails(id, patientId);
  }, []);

  return (
    <div>
      <h2>Patient Details</h2>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{patientDetails.name}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{patientDetails.gender}</td>
          </tr>
          <tr>
            <td>D.O.B.</td>
            <td>{patientDetails.dateOfBirth}</td>
          </tr>
          <tr>
            <td>Blood Group</td>
            <td>{patientDetails.bloodGroup}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{patientDetails.weight}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{patientDetails.height}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetails;
