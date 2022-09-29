import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import AdminHome from "./Admin/AdminHome";
import DoctorHome from "./Doctor/DoctorHome";
import Error from "./Error";
import PatientHome from "./Patient/PatientHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Layouts/LoginPage";
import Register from "./Patient/Register";
import Home1 from "./FrontPageComponents/Home1";
import ProtectedRoute from "./ProtectedRoute";

const Home = () => {
  const { id } = useParams();
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home1 />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route
            path="/admin/*"
            exact
            element={
              <ProtectedRoute Component={<AdminHome />} Role="[ROLE_ADMIN]" />
            }
          />
          <Route
            path="/doctor/appointment/*"
            exact
            element={
              <ProtectedRoute Component={<DoctorHome />} Role="[ROLE_DOCTOR]" />
            }
          />
          <Route
            path="/doctor/today/*"
            exact
            element={
              <ProtectedRoute Component={<DoctorHome />} Role="[ROLE_DOCTOR]" />
            }
          />
          <Route
            path="/patient/*"
            exact
            element={
              <ProtectedRoute
                Component={<PatientHome />}
                Role="[ROLE_PATIENT]"
              />
            }
          />
          <Route path="/register" exact element={<Register />} />
          <Route path="*" exact element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Home;
