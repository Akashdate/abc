import React from "react";
import { Link } from "react-router-dom";
import authService from "../../Services/auth.service";

const NavbarMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const adminName = user.name;
  return (
    <div>
      <div className="header">
        <div className="noprint ">
          {/*Navbar*/}
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            id="nav_bar"
            style={{ height: "5rem" /*, position: "fixed"*/ }}
          >
            <div className="container-fluid">
              <Link
                className="navbar-brand fw-bold img-fluid fs-4 mt-1"
                style={{ color: "rgb(245, 232, 51)" }}
              >
                <img
                  src={require("../../Images/LOGO.png")}
                  width="100"
                  height="auto"
                />
                E-HealthCare
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div>
                  <li className="nav-item mb-3 mx-3">
                    <h3 style={{ color: "white", marginTop: "-1rem" }}>
                      {" "}
                      Hi, {adminName}
                    </h3>
                  </li>
                </div>
                <div>
                  <li className="nav-item mb-3 mx-3">
                    <Link to={"/login"} className="nav-link">
                      <button
                        className="btn btn-warning btn-lg mt-sm-2 mb-sm-2"
                        style={{
                          right: "3rem",
                          top: "0.7rem",
                          position: "absolute",
                        }}
                        onClick={() => authService.logout()}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </div>
                {/* )} */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarMain;
