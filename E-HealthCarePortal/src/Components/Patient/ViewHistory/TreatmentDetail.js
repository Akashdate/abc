import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const TreatmentDetail = () => {
  const { treatmentId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const [treatment, setTreatment] = useState({});
  const [labData, setLabData] = useState([]);

  const navigate = useNavigate();
  const getTreatmentDetails = async () => {
    await axios
      .get(`${base_url}/patient/${id}/treatmentDetails/${treatmentId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        setTreatment(response.data);
        setLabData(response.data.labTests);
      })
      .catch((error) => {
        console.log("Error : " + error);
      });
  };

  useEffect(() => {
    getTreatmentDetails();
    console.log(URL);
  }, []);

  return (
    <div>
      <h3>Treatment Details:</h3>
      <table className="table table-bordered table-striped-columns">
        <tbody>
          <tr>
            <td>Doctor Name:</td>
            <td>{treatment.doctor}</td>
          </tr>
          <tr>
            <td>Patient Name:</td>
            <td>{treatment.patient}</td>
          </tr>
          <tr>
            <td>Symptoms:</td>
            <td>{treatment.symptoms}</td>
          </tr>
          <tr>
            <td>Medicines:</td>
            <td>{treatment.medicines}</td>
          </tr>
          <tr>
            <td>Treatment Date:</td>
            <td>{treatment.treatmentDate}</td>
          </tr>

          <tr>
            <td>LabTest</td>
            <td>
              {labData.map((lab) => (
                <tr>
                  <td>{lab.id}</td>
                  <td>{lab.testName}</td>
                </tr>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          className="btn btn-warning"
          onClick={() => {
            navigate("/patient/history");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TreatmentDetail;
