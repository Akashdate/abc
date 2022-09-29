import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";
import { Col } from "reactstrap";

const DepartmentList = () => {
  const [departments, setDepartment] = useState([]);

  const getDepartment = () => {
    axios
      .get(`${base_url}/admin/departments`, { headers: authHeader() })
      .then((Response) => {
        setDepartment(Response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("Somthing went wrong");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/admin/department/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("department deleted successfully", response.data);
        toast.success("Department deleted successfully");
        setDepartment(departments.filter((dept) => dept.id != id));
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("Department contains Doctor, Please remove them first");
      });
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className="mt-3">
      <ToastContainer />

      <Col md={10}>
        {departments.length == 0 ? (
          <h1>
            No Departments Found. You need to add one to show in the List.
          </h1>
        ) : (
          <div>
            <h3 id="text">List of Departments</h3>
            <hr />
            <div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => (
                    <tr key={department.id}>
                      <td>{department.deptName} </td>

                      <td>{department.deptDesc} </td>
                      <td>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            handleDelete(department.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Col>
    </div>
  );
};

export default DepartmentList;
