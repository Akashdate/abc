import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="noprint ">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          id="nav_bar"
          style={{ height: "5rem" }}
        >
          <div className="container-fluid">
            <Link
              className="navbar-brand fw-bold img-fluid fs-4 mt-1"
              to="/"
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
              <ul className="navbar-nav me-auto mb-2 mt-0 mb-lg-0">
                <li className="nav-item nav_name">
                  <Link className="nav-link active" to="/">
                    <b>Home</b>
                  </Link>
                </li>
                <li className="nav-item nav_name">
                  <Link className="nav-link" to="/about">
                    <b>About</b>
                  </Link>
                </li>
                <li className="nav-item nav_name">
                  <a href="#reviews" className="nav-link">
                    <b>Reviews</b>
                  </a>
                </li>
                <li className="nav-item nav_name">
                  <a href="#contactus" className="nav-link">
                    <b>Contact us</b>
                  </a>
                </li>
              </ul>
              <div>
                <li className="nav-item mb-3 mx-3">
                  <Link to={"/login"} className="nav-link">
                    <button className="btn btn-warning btn-lg mt-sm-2 mb-sm-2">
                      Login
                    </button>
                  </Link>
                </li>
              </div>
              <div>
                <li className="nav-item mb-3 mx-3">
                  <Link to={"/register"} className="nav-link">
                    <button className="btn btn-warning btn-lg mt-sm-2 mb-sm-2">
                      Sign Up
                    </button>
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
