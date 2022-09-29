import React from "react";
import AddDepartment from "./AddDepartment";
import DepartmentList from "./DepartmentList";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const DepartmentManagement = () => {
  return (
    <div>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row justify-content-center gx-5">
          <div className="col-3 mt-3">
            <ListGroup>
              <Link
                className="list-group-item list-group-item-action "
                to="/admin/departments/deptList"
              >
                Show Department
              </Link>
              <Link
                className="list-group-item list-group-item-action "
                to="/admin/departments/add-Dept"
              >
                Add Department
              </Link>

              <Link
                className="list-group-item list-group-item-action  "
                to="/admin"
                style={{ backgroundColor: "rgb(255,193,7)" }}
              >
                Back to Dashboard
              </Link>
            </ListGroup>
          </div>
          <div className="col-9">
            <Routes>
              <Route path="/" exact element={<DepartmentList />} />
              <Route path="deptList" element={<DepartmentList />} />
              <Route path="add-Dept" element={<AddDepartment />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
