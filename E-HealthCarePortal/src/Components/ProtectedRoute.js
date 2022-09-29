import React from "react";
import { useNavigate } from "react-router-dom";
import UnAuthorized from "./UnAuthorized";

const ProtectedRoute = (props) => {
  let user, Component, Role;
  const navigate = useNavigate();
  user = JSON.parse(localStorage.getItem("user"));
  Component = props.Component;
  Role = props.Role;
  console.log(user);
  console.log(Component);
  console.log(Role);

  return !user ? (
    navigate("/")
  ) : user.userType != Role ? (
    <UnAuthorized />
  ) : (
    Component
  );
};

export default ProtectedRoute;
