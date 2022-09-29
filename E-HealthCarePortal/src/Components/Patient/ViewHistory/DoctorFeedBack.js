import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import base_url from "../../../boot-api";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import authHeader from "../../../Services/auth-header";

const DoctorFeedBack = () => {
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const [currentValue, setCurrentValue] = useState(7);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(10).fill(0);
  const { doctorId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const [feedback, setFeedback] = useState({});
  const [doctorData, setDoctorData] = useState({});
  const navigate = useNavigate();

  const handleClick = (value) => {
    setCurrentValue(value);
    setFeedback({ ...feedback, rating: value });
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const getDoctorDetails = () => {
    axios
      .get(`${base_url}/patient/${id}/doctors/${doctorId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res.data);
        setDoctorData(res.data);
        setFeedback({ ...feedback, patient: id, doctor: doctorId });
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };

  const saveFeedback = (e) => {
    e.preventDefault();
    axios
      .post(`${base_url}/patient/${id}/feedback`, feedback, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        toast.success("Thank you for your feedback");
        navigate(`/patient/history`);
      })
      .catch((err) => {
        console.log("Error in post " + err);
      });
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <div>
      <h1>Please provide feedback </h1>
      <Form onSubmit={saveFeedback}>
        <FormGroup>
          <Label for="doctorName">
            <b>Doctor Name: </b>
          </Label>
          <Input
            id="doctorName"
            name="doctorName"
            readonly
            type="text"
            value={doctorData.name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="deptName">
            <b>Department: </b>
          </Label>
          <Input
            id="deptName"
            name="deptName"
            readonly
            type="text"
            value={doctorData.department}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">
            <b>Comments:</b>
            <span className="asterik" style={{ color: "red" }}>
              <b>&nbsp;*</b>
            </span>
          </Label>
          <Input
            id="exampleText"
            name="text"
            type="textarea"
            value={feedback.comments}
            onChange={(e) => {
              setFeedback({ ...feedback, comments: e.target.value });
            }}
            required
          />
        </FormGroup>
        {/* For Stars */}
        <FormGroup>
          <Label for="exampleText">
            <b>Rating:</b>
            <span className="asterik" style={{ color: "red" }}>
              <b>&nbsp;*</b>
            </span>{" "}
          </Label>
          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        </FormGroup>
        <button type="submit" className="btn btn-info">
          Submit Feedback
        </button>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default DoctorFeedBack;
