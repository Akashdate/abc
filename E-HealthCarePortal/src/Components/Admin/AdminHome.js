import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import DepartmentManagement from "./DepartmentManagement/DepartmentManagement";
import DoctorManagement from "./DoctorManagement/DoctorManagement";
import AdminNavbar from "../Layouts/AdminNavbar";
import PatientManagement from "./PatientManagement/PatientManagement";
import "./admin.css";
import Footer from "../FrontPageComponents/Footer";
import NavbarMain from "../Layouts/NavbarMain";

const AdminHome = () => {
  return (
    <div className="adminhome">
      <NavbarMain />
      <ToastContainer />
      <div className="Container-fluid ">
        <Routes>
          <Route path="/" element={<AdminNavbar />} />
          <Route path="doctors/*" element={<DoctorManagement />} />
          <Route path="departments/*" element={<DepartmentManagement />} />
          <Route path="patients/*" element={<PatientManagement />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default AdminHome;
