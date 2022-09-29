import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Col, Row } from "reactstrap";
import AppointmentSideBar from "./Appointment/AppointmentSideBar";
import FutureAppointment from "./Appointment/FutureAppointment";
import PatientDetails from "./TreatmentSession/PatientDetails";
import PatientHistory from "./TreatmentSession/PatientHistory";
import PendingAppointment from "./Appointment/PendingAppointment";
import Prescription from "./TreatmentSession/Prescription";
import TodayAppointment from "./Appointment/TodayAppointment";
import TreatmentPageSideBar from "./TreatmentSession/TreatmentPageSideBar";
import NavbarMain from "../Layouts/NavbarMain";

const DoctorHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const doctorname = user.name;

  return (
    <div>
      <ToastContainer />
      <div className="Container-fluid">
        <Row>
          <NavbarMain />
        </Row>
        <Row className="m-3">
          <Col md={3}>
            <Routes>
              <Route path="/*" element={<AppointmentSideBar />} />
              <Route
                path="/treatmentPage/*"
                element={<TreatmentPageSideBar />}
              />
            </Routes>
          </Col>

          <Col md={8}>
            <Routes>
              <Route path="/" element={<TodayAppointment />} />
              <Route path="/today" element={<TodayAppointment />} />
              <Route path="/future" element={<FutureAppointment />} />
              <Route path="/pending" element={<PendingAppointment />} />
              <Route path="/treatmentPage" element={<PatientDetails />} />
              <Route
                path="/treatmentPage/patientDetails"
                element={<PatientDetails />}
              />
              <Route
                path="/treatmentPage/prescription"
                element={<Prescription />}
              />
              <Route
                path="/treatmentPage/history"
                element={<PatientHistory />}
              />
            </Routes>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DoctorHome;
