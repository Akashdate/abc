import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const TreatmentPageSideBar = () => {
  const patientId = localStorage.getItem("patient");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  return (
    <div>
      <h2>Session</h2>
      <ListGroup>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/today/treatmentPage/patientDetails`}
        >
          Patient Details
        </Link>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/today/treatmentPage/prescription`}
        >
          New Prescription
        </Link>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/today/treatmentPage/history`}
        >
          History
        </Link>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/appointment/today`}
          onClick={() => localStorage.removeItem("patient")}
          style={{ backgroundColor: " rgb(255,193,7)" }}
        >
          Back
        </Link>
      </ListGroup>
    </div>
  );
};

export default TreatmentPageSideBar;
