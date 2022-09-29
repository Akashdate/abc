import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import base_url from "../../../boot-api";
import authHeader from "../../../Services/auth-header";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const bloodGroup = [
    "O_POSITIVE",
    "O_NEGATIVE",
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
  ];

  //FormData For Image Handling
  var newformData1 = new FormData();
  var newformData2 = new FormData();
  var [filee, setFilee] = useState();

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    newformData1.append("imageFile", e.target.files[0]);
    setFilee(e.target.files[0]);
    console.log(filee);
    for (var pair of newformData1.entries()) {
      console.log(pair[0]);
      console.log(pair);
    }
  };

  const updatePatient = (e) => {
    e.preventDefault();
    console.log(patient);

    const data = {
      id: patient.id,
      name: patient.name,
      gender: patient.gender ? patient.gender : "other",
      email: patient.email,
      address: patient.address,
      bloodGroup: patient.bloodGroup,
      dateOfBirth: patient.dateOfBirth,
      height: patient.height,
      weight: patient.weight,
    };

    newformData2.append("tPatient", JSON.stringify(data));
    for (var pair of newformData2.entries()) {
      console.log(pair[0] + " " + pair[1]);
      console.log(pair);
    }

    addPostToServer({ tPatient: JSON.stringify(data), imageFile: filee });
    toast.success("You have updated your profile");
  };

  const addPostToServer = (data) => {
    var againforrm = new FormData();
    againforrm.append("imageFile", data.imageFile);
    againforrm.append("tPatient", data.tPatient);
    console.log(data);

    axios
      .patch(`${base_url}/patient/${id}/patientDetails`, againforrm, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("patient details  updated successfully", response.data);
        navigate(`/patient`);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("😔something went wrong");
      });
  };

  const getpatientDetails = (id) => {
    axios
      .get(`${base_url}/patient/${id}/patientDetails`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        setPatient(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong" + error);
      });
  };

  useEffect(() => {
    getpatientDetails(id);
  }, []);

  return (
    <div className="container">
      <h3>Edit your profile</h3>
      <hr />
      <form>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label className="form-label">
                <b>Name: </b>
              </label>
              <input
                type="text"
                className="form-control col-4"
                id="name"
                value={patient.name}
                onChange={(e) => {
                  setPatient({ ...patient, name: e.target.value });
                }}
                placeholder="Enter name"
                required
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label className="form-label">
                <b>Email: </b>
              </label>

              <input
                type="email"
                className="form-control col-4"
                id="email"
                value={patient.email}
                onChange={(e) => {
                  setPatient({ ...patient, email: e.target.value });
                }}
                placeholder="Enter email"
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <FormGroup>
              <Label for="exampleSelect">
                <b>Gender: </b>
              </Label>
              <Col>
                <Input
                  name="select"
                  type="select"
                  className="form-control "
                  id="gender"
                  value={patient.gender}
                  onChange={(e) => {
                    setPatient({ ...patient, gender: e.target.value });
                  }}
                  required
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col md={6}>
            <div>
              <FormGroup>
                <Label for="bloodGroup">
                  <b>BloodGroup: </b>
                </Label>
                <Input
                  id="bloodGroup"
                  name="bloodGroup"
                  type="select"
                  value={patient.bloodGroup}
                  onChange={(e) => {
                    setPatient({
                      ...patient,
                      bloodGroup: e.target.value,
                    });
                  }}
                  required
                >
                  {bloodGroup.map((bloodtype) => {
                    if (bloodtype === patient.bloodGroup)
                      return (
                        <option value={bloodtype} selected>
                          {bloodtype}
                        </option>
                      );
                    else return <option value={bloodtype}>{bloodtype}</option>;
                  })}
                </Input>
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div>
              <FormGroup>
                <Label for="address">
                  <b>Enter Address: </b>
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="textarea"
                  value={patient.address}
                  onChange={(e) => {
                    setPatient({ ...patient, address: e.target.value });
                  }}
                  placeholder="Enter address"
                  required
                />
              </FormGroup>
            </div>
            <div className="form-group">
              <Label for="dob">
                <b>Date of Birth: </b>
              </Label>

              <input
                type="date"
                className="form-control col-4"
                id="dob"
                value={patient.dateOfBirth}
                onChange={(e) => {
                  setPatient({ ...patient, dateOfBirth: e.target.value });
                }}
                required
              />
            </div>
            <div className="form-group mt-3 ">
              <Label for="dob">
                <b>Weight: </b>
              </Label>
              <input
                type="number"
                className="form-control col-4"
                id="weight"
                value={patient.weight}
                onChange={(e) => {
                  setPatient({ ...patient, weight: e.target.value });
                }}
                placeholder="Enter weight"
                required
              />
            </div>
            <div className="form-group mt-3">
              <Label for="dob">
                <b>Height: </b>
              </Label>

              <input
                type="number"
                className="form-control col-4"
                id="height"
                value={patient.height}
                onChange={(e) => {
                  setPatient({ ...patient, height: e.target.value });
                }}
                placeholder="Enter height"
                required
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="col-3 mt-2" id="reviews">
              <Label for="dob">
                <b>Profile picture:</b>
                <span className="asterik" style={{ color: "red" }}>
                  <b>&nbsp;*</b>
                </span>
              </Label>

              <Card
                style={{
                  width: "18rem",
                }}
              >
                <img
                  src={"http://localhost:8080/images" + `/${patient.imagePath}`}
                />
                <Input
                  id="exampleFile"
                  name="patientImage"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  value={patient.image}
                  onChange={fileSelectedHandler}
                  required
                />
              </Card>
            </div>
          </Col>
        </Row>{" "}
        <br />
        <div className="text-center">
          <button
            onClick={(e) => updatePatient(e)}
            className="btn btn-info btn-lg"
          >
            Save
          </button>
        </div>
      </form>
      <hr />
    </div>
  );
};

export default EditProfile;
