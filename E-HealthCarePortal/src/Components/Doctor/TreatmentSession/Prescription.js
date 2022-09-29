import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormGroup, Input, Label } from "reactstrap";
import base_url from "../../../boot-api";
import PatientDetails from "./PatientDetails";
import { Multiselect } from "multiselect-react-dropdown";
import authHeader from "../../../Services/auth-header";

const Prescription = () => {
  const patientId = localStorage.getItem("patient");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  let [treatmentObj, setTreatmentObj] = useState({});
  const [labTests, setLabTests] = useState([]);

  const getAllLabTests = () => {
    axios
      .get(`${base_url}/doctor/${id}/labTests`, { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
        setLabTests(response.data);
      })
      .catch((error) => {
        toast.error("Lab tests Not found!");
      });
  };

  const saveTreatmentDetails = (e) => {
    e.preventDefault();
    console.log(treatmentObj);
    axios
      .post(`${base_url}/doctor/${id}/treatmentDetailsEntry`, treatmentObj, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(treatmentObj);
        console.log("treatment added successfully", response.data);
        toast.success("Treatment details added");
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getAllLabTests();
    setTreatmentObj({
      ...treatmentObj,
      patient: patientId,
      doctor: id,
    });
  }, []);

  return (
    <div>
      <PatientDetails />
      <div>
        <h2>Prescription</h2>
        <hr />
        <form>
          {/* symptoms in text area */}
          <div className="form-group m-3">
            <FormGroup>
              <Label for="deptDescription">
                <b>Symptom:</b>
                <span className="asterik" style={{ color: "red" }}>
                  <b>&nbsp;*</b>
                </span>{" "}
              </Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                value={treatmentObj.symptoms}
                onChange={(e) => {
                  setTreatmentObj({
                    ...treatmentObj,
                    symptoms: e.target.value,
                  });
                }}
                placeholder="Symptoms"
              />
            </FormGroup>
          </div>
          {/* drop down multiple select */}
          <div className="form-group m-3">
            <Label for="deptDescription">
              <b>Medicines:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>{" "}
            </Label>
            <input
              type="text"
              className="form-control col-4"
              id="medicine"
              value={treatmentObj.medicines}
              onChange={(e) => {
                setTreatmentObj({ ...treatmentObj, medicines: e.target.value });
              }}
              placeholder="Medicines"
            />
          </div>
          {/* drop down for Lab */}
          <div className="form-group m-3">
            <FormGroup>
              <Label for="exampleSelectMulti">
                <b>Lab Tests :</b>
                <span className="asterik" style={{ color: "red" }}>
                  <b>&nbsp;*</b>
                </span>
              </Label>
              <Multiselect
                options={labTests}
                displayValue={"testName"}
                onRemove={(event) => {
                  let temp = [event.map((e) => e.id)];
                  setTreatmentObj({
                    ...treatmentObj,
                    labTestNo: temp[0],
                  });
                  console.log(event);
                }}
                onSelect={(event) => {
                  let temp = [event.map((e) => e.id)];
                  setTreatmentObj({
                    ...treatmentObj,
                    labTestNo: temp[0],
                  });
                  console.log(event);
                }}
              />
            </FormGroup>
          </div>

          <div>
            <button
              onClick={(e) => saveTreatmentDetails(e)}
              className="btn btn-info"
            >
              Add Prescription
            </button>
          </div>
        </form>
        <hr />
      </div>
    </div>
  );
};

export default Prescription;
