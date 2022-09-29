import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormGroup, Input, Label, FormText, Row, Col, Alert } from "reactstrap";
import base_url from "../../boot-api";
import authHeader from "../../Services/auth-header";
import Footer from "../FrontPageComponents/Footer";
import Header from "../FrontPageComponents/Header";

const Register = () => {
  //const user = JSON.parse(localStorage.getItem("user"));
  //const id = user.id;
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const todayDate = new Date();
  const endDate =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(todayDate.getDate()).padStart(2, "0");

  //-----------------
  var newformData1 = new FormData();
  var newformData2 = new FormData();
  var [filee, setFilee] = useState();
  //-------------------
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
  const registerPatient = (e) => {
    // e.preventDefault();
    // console.log("Register function called");
    // if (patient.name.length >= 3) {
    //   console.log(patient);
    //   const registerForm = new FormData();
    //   registerForm.append("imageFile", patient.image);

    //   axios
    //     .post(`${base_url}/register`, registerForm)
    //     .then((response) => {
    //       console.log("patient registered successfully", response.data);
    //       toast.success("patient registered successfully");
    //       navigate(`/login`);
    //     })
    //     .catch((error) => {
    //       console.log("Something went wrong", error);
    //       toast.error("😔something went wrong");
    //     });
    // }
    e.preventDefault();
    if (errorName == "" && errorPassword == "") {
      console.log(patient);

      const data = {
        // id: patient.id,
        name: patient.name,
        password: patient.password,
        gender: patient.gender,
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
    } else {
      alert("E-HealthCare Portal Says...", "Enter Valid Data");
    }
  };

  const addPostToServer = (data) => {
    var againforrm = new FormData();
    againforrm.append("imageFile", data.imageFile);
    againforrm.append("tPatient", data.tPatient);
    console.log(data);

    axios
      .post(`${base_url}/register`, againforrm, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log("patient details  updated successfully", response.data);
        // toast.success("patient details  updated successfully");
        navigate(`/login`);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("😔something went wrong");
      });
  };

  //-------------
  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    newformData1.append("imageFile", e.target.files[0]);
    setFilee(e.target.files[0]);
    console.log(filee);
    for (var pair of newformData1.entries()) {
      console.log(pair[0]);
      console.log(pair);
    }
    // setImage(URL.createObjectURL(e.target.files[0]));
  };
  //-----------

  const validatePatientName = (patientName) => {
    console.log(patientName.length);

    patientName.length < 3
      ? setErrorName("min length for patient name is 3")
      : setErrorName("");
  };

  const validatePassword = (patientPassword) => {
    console.log(patientPassword.length);

    patientPassword.length < 8
      ? setErrorPassword("weak password")
      : setErrorPassword("");
  };

  return (
    <div>
      <Header />
      <div className="container my-3">
        <div className="container-fluid">
          <Row>
            <Col md={6}>
              <div className="ccard ccard-container mb-5">
                <img
                  src={require("../../Images/doctors-1.jpg")}
                  alt="profile-img"
                  className="cprofile-img-card img-fluid"
                />
                {/* <h3 className="text-center text-warning">E-HealthCare</h3> */}
              </div>
            </Col>
            <Col md={6}>
              <h3>Patient Registration</h3>
              <form onSubmit={registerPatient}>
                <Row className="mt-3">
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
                        value={patient.name}
                        onChange={(e) => {
                          setPatient({ ...patient, name: e.target.value });
                        }}
                        onBlur={() => validatePatientName(patient.name)}
                        placeholder="Enter name"
                        required
                      />
                      <span className="error" style={{ color: "red" }}>
                        {/* &cross; */}
                        {errorName}
                      </span>

                      {/* {patient.name.length < 3 ? (
              <h6 className="emptyFieldWarning">
                *cannot be empty and lenght greater than 3
              </h6>
            ) : (
              <div></div>
            )} */}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="form-label">
                        <b>Date of Birth:</b>
                        <span className="asterik" style={{ color: "red" }}>
                          <b>&nbsp;*</b>
                        </span>
                      </label>

                      <input
                        type="date"
                        className="form-control col-4"
                        id="dob"
                        max={endDate}
                        value={patient.dateOfBirth}
                        onChange={(e) => {
                          setPatient({
                            ...patient,
                            dateOfBirth: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6}>
                    <div className="form-group">
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
                        value={patient.email}
                        onChange={(e) => {
                          setPatient({ ...patient, email: e.target.value });
                        }}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="form-label">
                        <b>Password:</b>
                        <span className="asterik" style={{ color: "red" }}>
                          <b>&nbsp;*</b>
                        </span>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control col-4"
                        id="password"
                        value={patient.password}
                        onChange={(e) => {
                          setPatient({ ...patient, password: e.target.value });
                        }}
                        placeholder="Enter password"
                        required
                        onBlur={() => validatePassword(patient.password)}
                      />
                      <span className="error" style={{ color: "red" }}>
                        {/* &cross; */}
                        {errorPassword}
                      </span>
                    </div>
                  </Col>
                </Row>

                <div className="mt-3">
                  <FormGroup>
                    <Label for="address">
                      <b>Enter Address:</b>{" "}
                      <span className="asterik" style={{ color: "red" }}>
                        <b>&nbsp;*</b>
                      </span>
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
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect">
                        <b>Gender:</b>
                        <span className="asterik" style={{ color: "red" }}>
                          <b>&nbsp;*</b>
                        </span>
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="select"
                          type="select"
                          className="form-control col-4"
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
                    {/* <div className="form-group">
                      <label className="form-label">Gender:</label>

                      <input
                        type="text"
                        className="form-control col-4"
                        id="gender"
                        value={patient.gender}
                        onChange={(e) => {
                          setPatient({ ...patient, gender: e.target.value });
                        }}
                      />
                    </div> */}
                  </Col>
                  <Col md={6}>
                    <div>
                      <FormGroup>
                        <Label for="bloodGroup">
                          <b>BloodGroup:</b>{" "}
                          <span className="asterik" style={{ color: "red" }}>
                            <b>&nbsp;*</b>
                          </span>
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
                            else
                              return (
                                <option value={bloodtype}>{bloodtype}</option>
                              );
                          })}
                        </Input>
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="form-label">
                        <b> Height(cm):</b>
                        <span className="asterik" style={{ color: "red" }}>
                          <b>&nbsp;*</b>
                        </span>
                      </label>

                      <input
                        type="number"
                        className="form-control col-4"
                        id="height"
                        min={50}
                        max={200}
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
                    <div className="form-group">
                      <label className="form-label">
                        <b>Weight(kg):</b>
                        <span className="asterik" style={{ color: "red" }}>
                          <b>&nbsp;*</b>
                        </span>
                      </label>

                      <input
                        type="number"
                        className="form-control col-4"
                        id="weight"
                        min={3}
                        max={200}
                        value={patient.weight}
                        onChange={(e) => {
                          setPatient({ ...patient, weight: e.target.value });
                        }}
                        placeholder="Enter weight"
                        required
                      />
                    </div>
                  </Col>
                </Row>

                <div className="mt-3">
                  <FormGroup>
                    <Label for="exampleFile">
                      <b> Upload Image</b>
                      <span className="asterik" style={{ color: "red" }}>
                        <b>&nbsp;*</b>
                      </span>
                    </Label>
                    <Input
                      id="exampleFile"
                      name="patientImage"
                      type="file"
                      accept=".jpg,.png, .jpeg"
                      value={patient.image}
                      onChange={fileSelectedHandler}
                      required
                    />
                    <FormText>
                      Please upload (.jpg, .jpeg or .png ) type of image.
                    </FormText>
                  </FormGroup>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-info">
                    Register
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
{
  /* <Row>
            <Col md={6}>
              
            </Col>
            <Col md={6}>
              
            </Col>
          </Row> */
}
