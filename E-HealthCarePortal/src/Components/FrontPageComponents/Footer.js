import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="noprint">
      <footer className="text-muted py-5 bg-dark static" id="contactus">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <img
                src={require("../../Images/LOGO.png")}
                width="100"
                height="auto"
                className="ms-md-5 img-fluid"
              />
              <p className="textbottom">
                <h2>E-HealthCare</h2>
              </p>
            </div>
            <div className="col-md-6">
              <ul id="footer_text">
                <li>
                  <span style={{ color: "white", fontSize: "medium" }}>
                    Contact Us
                  </span>
                </li>
                <li>
                  <i className="bi bi-envelope"></i>{" "}
                  <a href="mailto:ehealthcarehospital@gmail.com">
                    ehealthcarehospital@gmail.com
                  </a>
                </li>
                <li>
                  <i className="bi bi-telephone"></i>
                  <span>+91 8308308308</span>
                </li>
                <li>
                  <i className="bi bi-whatsapp"></i>
                  <span>+91 999999999</span>
                </li>
                <li>
                  <p className="mb-0">
                    To Know More &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="About">About Us</Link>
                  </p>
                </li>
                <li>
                  <p className="mb-1">&copy; E-HealthCareSystems2022</p>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="float-end mb-1">
                <a href="#">Back to top</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
