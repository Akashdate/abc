import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const AppointmentSideBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  return (
    <div>
      <div>
        <h2>Appointments</h2>
      </div>
      <ListGroup>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/appointment/today`}
        >
          Today
        </Link>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/appointment/future`}
        >
          Future
        </Link>
        <Link
          className="list-group-item list-group-item-action "
          to={`/doctor/appointment/pending`}
        >
          Pending
        </Link>
      </ListGroup>
    </div>
  );
};

export default AppointmentSideBar;
