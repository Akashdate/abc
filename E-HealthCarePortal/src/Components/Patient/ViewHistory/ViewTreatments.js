import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const ViewTreatments = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const [treatmentList, setTreatmentList] = useState([]);
  console.log("Id : " + id);
  const getTreatmentList = () => {
    axios
      .get(`${base_url}/patient/${id}/briefTreatmentList`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        setTreatmentList(response.data);
      });
  };

  useEffect(() => {
    getTreatmentList();
  }, []);

  return (
    <div>
      {treatmentList.length == 0 ? (
        <h1>You have no previous treatment records!</h1>
      ) : (
        <div>
          <h3>Your previous treatments:</h3>
          <table className="table table-bordered table-striped m-3">
            <thead>
              <tr>
                <th>Treatment Id</th>
                <th>Treatment Date</th>
                <th>Doctor Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {treatmentList.map((treatment) => {
                return (
                  <tr key={treatment.id}>
                    <td>{treatment.id} </td>
                    <td>{treatment.treatmentDate} </td>
                    <td>{treatment.doctor} </td>
                    <td>
                      <Link to={`/patient/treatment/${treatment.id}`}>
                        <button className="btn btn-info ml-2">
                          Get Details
                        </button>
                      </Link>
                      <Link to={`/patient/feedback/${treatment.doctorId}`}>
                        <button className="btn btn-warning ml-2 ms-3">
                          Give feedback
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTreatments;
