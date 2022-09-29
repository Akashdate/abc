import React, { useEffect, useState } from "react";
import { ListGroup } from "reactstrap";

import { Routes, Route, Link } from "react-router-dom";
import GetDoctorByDeptName from "./GetDoctorByDeptName";
import AddDoctor from "./AddDoctor";
import axios from "axios";
import authHeader from "../../../Services/auth-header";
import base_url from "../../../boot-api";

const DoctorManagement = () => {
  const [departmentList, setDepartment] = useState([]);

  const init = () => {
    axios
      .get(`${base_url}/admin/departments`, { headers: authHeader() })
      .then((Response) => {
        console.log("printing the departments ", Response.data);
        setDepartment(Response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center gx-5">
          <div className="col-3">
            <h3 className="m-2">Departments</h3>
            <ListGroup>
              {departmentList.map((dept) => (
                <Link
                  className="list-group-item list-group-item-action "
                  to={`/admin/doctors/getDoctor/${dept.deptName}`}
                >
                  {dept.deptName}
                </Link>
              ))}
              <Link
                className="list-group-item list-group-item-action "
                to="/admin"
                style={{ backgroundColor: "rgb(255,193,7)" }}
              >
                Back to Dashboard
              </Link>
            </ListGroup>
          </div>
          <div className="col-9">
            <Routes>
              <Route exact path="/" element={<GetDoctorByDeptName />} />
              <Route
                path="getDoctor/:deptName"
                element={<GetDoctorByDeptName />}
              />
              <Route path="addDoctor" element={<AddDoctor />} />
              <Route path="updateDoctor/:id" element={<AddDoctor />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;
