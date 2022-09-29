import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import authService from "../../Services/auth.service";
import Footer from "../FrontPageComponents/Footer";
import Header from "../FrontPageComponents/Header";
import { ReactComponent as ReactLogo } from "../../Images/result.svg";

const LoginPage = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const validateUser = async (e) => {
    e.preventDefault();

    let path = await authService.login(user);
    console.log("path: ------------" + path);

    navigate(path);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div>
          <Row
            className="  justify-content-center align-items-center"
            style={{ height: "95vh" }}
          >
            <Col md={6} className="ccard ccard-container mb-5 ">
              <div className="cprofile-img-card img-fluid">
                {/* <img
                src={require("../../Images/result.svg")}
                alt="profile-img"
                className="cprofile-img-card img-fluid"
              /> */}
                <ReactLogo />
                {/* <h3 className="text-center text-warning">E-HealthCare</h3> */}
              </div>
            </Col>

            <Col
              md={4}
              className="p-3 shadow-lg"
              style={{ "background-color": "white" }}
            >
              <form>
                <FormGroup>
                  <Label for="exampleEmail" className="mt-2">
                    Email
                  </Label>
                  <Input
                    id="exampleEmail"
                    className="mt-2"
                    name="email"
                    placeholder="Enter Email"
                    type="email"
                    value={user.email}
                    onChange={(e) => {
                      // setEmail(e.target.value);
                      setUser({ ...user, email: e.target.value });
                    }}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword" className="mt-2">
                    Password
                  </Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    className="mt-2"
                    placeholder="Enter Password"
                    type="password"
                    value={user.password}
                    onChange={(e) => {
                      // setPassword(e.target.value);
                      setUser({ ...user, password: e.target.value });
                    }}
                    required
                  />
                </FormGroup>
                <div className="text-center mt-2">
                  <button
                    onClick={validateUser}
                    className="btn mt-3 p-3 "
                    style={{
                      backgroundColor: "rgb(22,160,133)",
                      color: "white",
                    }}
                  >
                    Login
                  </button>
                </div>
                {/* <div className="mt-2">
                <Link to="/register">Not Registered yet?</Link>
              </div> */}
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <Row>
        <Footer />
      </Row>
    </div>
  );
};
export default LoginPage;
