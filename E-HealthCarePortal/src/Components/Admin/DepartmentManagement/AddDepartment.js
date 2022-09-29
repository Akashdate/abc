import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Col } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const AddDepartment = (props) => {
  const [department, setDepartment] = useState({});
  const [error, setError] = useState("");

  const saveDepartment = (e) => {
    e.preventDefault();

    axios
      .post(`${base_url}/admin/department`, department, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("department added successfully", response.data);
        toast.success("You have added a new Department!");
      })
      .catch((error) => {
        console.log("something went wrong", error);
        toast.error("Something went wrong");
      });
  };

  const validateDeptName = (deptName) => {
    console.log(deptName.length);
    deptName.length > 30
      ? setError("max length for deptName is 30")
      : setError("");
  };

  return (
    <div className="mt-3">
      <h3>Add Department</h3>
      <Col md={10}>
        <hr />

        <Form className="mt-3" onSubmit={saveDepartment}>
          <FormGroup>
            <Label for="deptName">
              <b>Department Name:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>{" "}
            </Label>
            <Input
              id="dep"
              value={department.deptName}
              onChange={(e) => {
                setDepartment({ ...department, deptName: e.target.value });
              }}
              onBlur={(e) => validateDeptName(department.deptName)}
              placeholder="Enter Department Name"
              required
            />
            <span className="error" style={{ color: "red" }}>
              {/* &cross; */}
              {error}
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="deptDescription">
              <b>Department Description:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>{" "}
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              value={department.deptDesc}
              onChange={(e) => {
                setDepartment({ ...department, deptDesc: e.target.value });
              }}
              required
            />
          </FormGroup>

          <div>
            <Button type="submit" className="btn btn-info">
              Save
            </Button>
          </div>
        </Form>
        <hr />
      </Col>
    </div>
  );
};

export default AddDepartment;
