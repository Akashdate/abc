import React from "react";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div classname="container-fluid m-3">
        <h2>You aren't Authorized to access this page !!!!</h2>
        <button className="btn btn-warning m-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnAuthorized;
