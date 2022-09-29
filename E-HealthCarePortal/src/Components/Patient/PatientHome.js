import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Col, ListGroup, Row } from "reactstrap";
import ViewAppointments from "./Appointment/ViewAppointments";
import EditProfile from "./EditProfile/EditProfile";
import ViewTreatments from "./ViewHistory/ViewTreatments";
import BookAppointment from "./Appointment/BookAppointment";
import TreatmentDetail from "./ViewHistory/TreatmentDetail";
import DoctorFeedBack from "./ViewHistory/DoctorFeedBack";
import NavbarMain from "../Layouts/NavbarMain";

const PatientHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  console.log(id);

  return (
    <div>
      <NavbarMain />
      <ToastContainer />
      <div className="Container-fluid">
        <Row className="m-3">
          <Col md={3}>
            <ListGroup>
              <Link
                className="list-group-item list-group-item-action "
                to={`/patient/editProfile`}
              >
                Edit Profile
              </Link>
              <Link
                className="list-group-item list-group-item-action "
                to={`/patient/appointment`}
              >
                Appointments
              </Link>
              <Link
                className="list-group-item list-group-item-action "
                to={`/patient/history`}
              >
                Patient History
              </Link>
            </ListGroup>
          </Col>
          <Col md={8}>
            <Routes>
              <Route path="/" exact element={<ViewAppointments />} />
              <Route path="editProfile" exact element={<EditProfile />} />
              <Route path="appointment/*" element={<ViewAppointments />} />
              <Route path="bookAppointment/*" element={<BookAppointment />} />
              <Route path="history/*" element={<ViewTreatments />} />
              <Route
                path="treatment/:treatmentId"
                element={<TreatmentDetail />}
              />
              <Route path="feedback/:doctorId" element={<DoctorFeedBack />} />
            </Routes>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PatientHome;
