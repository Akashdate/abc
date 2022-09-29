import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormGroup, Input, Label } from "reactstrap";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";
import { Link } from "react-router-dom";

const PatientManagement = () => {
  const [patientList, setPatientList] = useState([]);

  var [patientSearch, setPatientSearch] = useState("");

  const init = () => {
    axios
      .get(`${base_url}/admin/getAllPatients`, { headers: authHeader() })
      .then((Response) => {
        console.log("printing the Patients ", Response.data);
        setPatientList(Response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const handleDelete = (id) => {
    console.log("Printing id", id);
    axios
      .delete(`${base_url}/admin/deletePatient/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("patient deleted successfully", response.data);
        toast.success("Patient Records deleted");
        setPatientList(patientList.filter((patient) => patient.id != id));
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error(
          "This patient is currently taking treatment!" +
            " You Can't delete his/her records!"
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center gx-5">
          <div className="col-10">
            <h2 className="mt-3">List Of Patients</h2>
            <hr />
            <Link
              className="list-group-item list-group-item-action "
              to="/admin"
            >
              <button className="btn btn-info btn-lg">Back to Dashboard</button>
            </Link>
            <hr />
            {patientList.length == 0 ? (
              <h1>No patients taking treatment in this hospital!</h1>
            ) : (
              <div>
                <FormGroup>
                  <Label for="patientSearch">Search By Patient Name:</Label>
                  <Input
                    id="patientSearch"
                    name="search"
                    placeholder="Enter Patient Name"
                    type="search"
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                    }}
                  />
                </FormGroup>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>GENDER</th>
                      <th>EMAIL</th>
                      <th>ADDRESS</th>
                      <th>BLOOD GROUP</th>
                      <th>BIRTH DATE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientList
                      .filter((patient) => {
                        if (patientSearch == "") {
                          return patient;
                        } else if (
                          patient.name
                            .toLowerCase()
                            .includes(patientSearch.toLowerCase())
                        ) {
                          return patient;
                        }
                      })
                      .map((patient) => {
                        return (
                          <tr key={patient.id}>
                            <td>{patient.name} </td>
                            <td>{patient.gender} </td>
                            <td>{patient.email} </td>
                            <td>{patient.address} </td>
                            <td>{patient.bloodGroup} </td>
                            <td>{patient.dateOfBirth} </td>
                            <td>
                              <button
                                className="btn btn-danger ml-2"
                                onClick={() => {
                                  handleDelete(patient.id);
                                }}
                              >
                                Delete
                              </button>
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
      </div>
    </div>
  );
};

export default PatientManagement;
