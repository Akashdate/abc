import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const PatientHistory = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const patientId = localStorage.getItem("patient");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const showPatientDetails = (id, patientId) => {
    console.log("hello " + id);
    axios
      .get(`${base_url}/doctor/${id}/patientHistory/${patientId}`, {
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
      {patientDetails.length == 0 ? (
        <h1>This Patient has no previous Treatment Records</h1>
      ) : (
        <div>
          <h2>Previous Treatment Records</h2>
          <hr />
          <div>
            <table className="table table-bordered table-striped">
              <thead>
                <th>Symptoms</th>
                <th>Medicines</th>
                <th>Treatment Date</th>
                <th>Doctor Name</th>
                <th>Lab Tests</th>
              </thead>
              <tbody>
                {patientDetails.map((history) => {
                  return (
                    <tr>
                      <td>{history.symptoms} </td>

                      <td>{history.medicines} </td>
                      <td>{history.treatmentDate} </td>
                      <td>Dr. {history.doctorName}</td>
                      <td>
                        {history.labTests.map((lab) => {
                          return (
                            <ul>
                              <li>{lab.testName}</li>
                            </ul>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
