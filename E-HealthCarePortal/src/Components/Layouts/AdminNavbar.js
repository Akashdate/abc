import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-12 py-5 title-block">
          <span className="fs-1 " style={{ fontWeight: "bold" }}>
            WELCOME TO ADMIN DASHBOARD
          </span>
        </div>
      </div>
      <div className="row justify-content-evenly mb-3">
        <div className="col-3 border plan_block">
          <Link to={`/admin/departments`}>
            <Button
              className="adminNavbarText fs-1 text-white"
              color="#16a085"
              size="lg"
              name="departmentManagement"
            >
              Department <br /> Management
            </Button>
          </Link>
        </div>

        <div className="col-3 border plan_block">
          <Link to={`/admin/doctors`}>
            <Button
              className="adminNavbarText fs-1 text-white"
              color="#16a085"
              size="lg"
              name="doctorManagement"
            >
              Doctor <br />
              Management
            </Button>
          </Link>
        </div>

        <div className="col-3 border plan_block">
          <Link to={`/admin/patients`}>
            <Button
              className="adminNavbarText fs-1 text-white"
              color="#16a085"
              size="lg"
              name="patientManagement"
            >
              Patient
              <br /> Management
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
