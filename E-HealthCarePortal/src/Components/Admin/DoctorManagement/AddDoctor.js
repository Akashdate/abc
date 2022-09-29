import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const AddDoctor = () => {
  let [doctorObj, setDoctorObj] = useState({});
  const navigate = useNavigate();
  const [deptList, setDeptList] = useState([]);
  const { id } = useParams();

  const saveDoctor = (e) => {
    e.preventDefault();

    console.log(doctorObj);
    if (id) {
      //update
      doctorObj.id = id;
      console.log("doc: " + doctorObj);
      axios
        .put(`${base_url}/admin/Doctor/${id}`, doctorObj, {
          headers: authHeader(),
        })
        .then((response) => {
          console.log("doctor data updated successfully", response.data);
          toast.success("🩺doctor data updated successfully");
          navigate(`/admin/doctors/getDoctor/${doctorObj.department}`);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
          toast.error("😔something went wrong");
        });
    } else {
      //create
      console.log(doctorObj);
      axios
        .post(`${base_url}/admin/Doctor`, doctorObj, { headers: authHeader() })
        .then((response) => {
          console.log(doctorObj);
          console.log("doctor added successfully", response.data);
          toast.success("👨‍⚕️doctor added successfully");
          navigate(`/admin/doctors/getDoctor/${doctorObj.department}`);
        })
        .catch((error) => {
          console.log("something went wrong", error);
          toast.error("😔something went wrong");
        });
    }
  };

  function _handleRadio_Valid(event) {
    let value = true;
    if (typeof event.currentTarget.value === "string") {
      event.currentTarget.value === "true" ? (value = true) : (value = false);
    }
    setDoctorObj({ ...doctorObj, validated: value });
  }

  function _handleRadio_Working(event) {
    let value = true;
    if (typeof event.currentTarget.value === "string") {
      event.currentTarget.value === "true" ? (value = true) : (value = false);
    }
    setDoctorObj({ ...doctorObj, working: value });
  }

  const getAllDetpartment = () => {
    axios
      .get(`${base_url}/admin/departments`, { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
        //toast.success("🙂Got All Departments!");
        setDeptList(response.data);
      })
      .catch((error) => {
        toast.error("No Department Found!");
      });
  };

  const getDoctor = (id) => {
    axios
      .get(`${base_url}/admin/Doctor/${id}`, { headers: authHeader() })
      .then(async (doctor) => {
        console.log(doctor.data);

        setDoctorObj(doctor.data);
        console.log(doctorObj.name);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    if (id) {
      getDoctor(id);
    }
    getAllDetpartment();
    setDoctorObj({ ...doctorObj, department: "Orthopaedics" });
  }, []);

  return (
    <div className="container-fluid mt-3">
      <h3>Add/Edit Doctor</h3>
      <Col md={10}>
        <hr />
        <form>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label className="form-label">
                  <b>Name:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="name"
                  value={doctorObj.name}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, name: e.target.value });
                  }}
                  placeholder="Enter name"
                />
              </div>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">
                  <b>Gender:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </Label>
                <Input
                  name="select"
                  type="select"
                  className="form-control col-4"
                  id="gender"
                  value={doctorObj.gender}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, gender: e.target.value });
                  }}
                  required
                >
                  <option value="">---select gender---</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="form-group mt-3">
                <label className="form-label">
                  <b>Email:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </label>
                <input
                  type="email"
                  className="form-control col-4"
                  id="email"
                  value={doctorObj.email}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, email: e.target.value });
                  }}
                  placeholder="Enter email"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group mt-3">
                <label className="form-label">
                  <b>Password:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control col-4"
                  id="password"
                  value={doctorObj.password}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, password: e.target.value });
                  }}
                  placeholder="Enter password"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="form-group mt-3">
                <label className="form-label">
                  <b>Speciality:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="speciality"
                  value={doctorObj.speciality}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, speciality: e.target.value });
                  }}
                  placeholder="Enter speciality"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group mt-3">
                <label className="form-label">
                  <b>Education:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="education"
                  value={doctorObj.education}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, education: e.target.value });
                  }}
                  placeholder="Enter education"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="form-group mt-3">
                <label className="form-label">
                  <b>Fees:</b>
                  <span className="asterik" style={{ color: "red" }}>
                    <b>&nbsp;*</b>
                  </span>
                </label>
                <input
                  type="number"
                  min={500}
                  max={1500}
                  step={100}
                  className="form-control col-4"
                  id="fees"
                  value={doctorObj.fees}
                  onChange={(e) => {
                    setDoctorObj({ ...doctorObj, fees: e.target.value });
                  }}
                  placeholder="Enter fees"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group mt-3">
                <FormGroup>
                  <Label for="exampleSelect">
                    <b>Department:</b>
                    <span className="asterik" style={{ color: "red" }}>
                      <b>&nbsp;*</b>
                    </span>
                  </Label>
                  <Input
                    id="exampleSelect"
                    name="department"
                    type="select"
                    value={doctorObj.department}
                    onChange={(e) => {
                      console.log(doctorObj.department);
                      setDoctorObj({
                        ...doctorObj,
                        department: e.target.value,
                      });
                    }}
                  >
                    {deptList.map((dept) => {
                      if (dept.deptName === doctorObj.department) {
                        return (
                          <option selected value={dept.deptName}>
                            {dept.deptName}
                          </option>
                        );
                      } else {
                        return (
                          <option value={dept.deptName}>
                            {" "}
                            {dept.deptName}{" "}
                          </option>
                        );
                      }
                    })}
                  </Input>
                </FormGroup>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label className="form-label">
                <b>Valid:</b>
                <span className="asterik" style={{ color: "red" }}>
                  <b>&nbsp;*</b>
                </span>
              </label>
              <div className="form-group radio">
                <label className="form-label">
                  <input
                    type="radio"
                    name="isValid"
                    value="true"
                    onChange={_handleRadio_Valid}
                  />
                  Yes
                </label>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <label className="form-label">
                  <input
                    type="radio"
                    name="isValid"
                    value="false"
                    onChange={_handleRadio_Valid}
                  />
                  No
                </label>
              </div>
            </Col>
            <Col md={6}>
              <label className="form-label">
                <b>Working:</b>
                <span className="asterik" style={{ color: "red" }}>
                  <b>&nbsp;*</b>
                </span>
              </label>
              <div className="form-group radio">
                <label className="form-label">
                  <input
                    type="radio"
                    name="isWorking"
                    value="true"
                    onChange={_handleRadio_Working}
                  />
                  Yes
                </label>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <label className="form-label">
                  <input
                    type="radio"
                    name="isWorking"
                    value="false"
                    onChange={_handleRadio_Working}
                  />
                  No
                </label>
              </div>
            </Col>
          </Row>
          <div className="mt-3 text-center">
            <button
              onClick={(e) => saveDoctor(e)}
              className="btn btn-info btn-lg"
            >
              Save
            </button>
          </div>
        </form>
        <hr />
      </Col>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default AddDoctor;
