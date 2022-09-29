import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import base_url from "../../../boot-api";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import authHeader from "../../../Services/auth-header";

const BookAppointment = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const [payment, setPayment] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [appointment, setAppointment] = useState({});
  const [timeslots, setTimeSlots] = useState([]);
  var bookTimings = [""];
  const [isDisabled, setIsDisabled] = useState(true);
  const todayDate = new Date();
  const startDate =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(todayDate.getDate()).padStart(2, "0");
  const endDate =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 2).padStart(2, "0") +
    "-" +
    String(todayDate.getDate()).padStart(2, "0");

  const creatTimeSlot = (fromTime, toTime) => {
    let startTime = moment(fromTime, "HH:mm");
    let endTime = moment(toTime, "HH:mm");
    if (endTime.isBefore(startTime)) {
      endTime.add(1, "day");
    }
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format("HH:mm"));
      startTime.add(30, "minutes");
    }
    return arr;
  };

  const getDoctorList = (deptName) => {
    axios
      .get(`${base_url}/patient/${id}/${deptName}`, { headers: authHeader() })
      .then(
        (response) => {
          setDoctorList(response.data);
          console.log(response.data);
        },
        (error) => {
          toast.error("Something went wrong !");
          console.log(error);
        }
      )
      .catch((error) => {
        if (error.header.status == 403) {
          toast.error("Not Allowed unauthorized access");
        }
      });
  };

  const getDepartments = () => {
    axios
      .get(`${base_url}/patient/${id}/getAllDepartments`, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        setDepartmentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Razor Pay Implementation
  const onlineRazorPay = async (e, amount) => {
    console.log(amount);
    if (amount == "" || amount == null) {
      console.log(amount);
      return;
    }

    await axios
      .post(
        `${base_url}/patient/${id}/create_order`,
        { amount: appointment.fees, info: "order_request" },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "created") {
          let options = {
            key: "rzp_test_VtAhpPLSMgpfZO", // Enter the Key ID generated from the Dashboard
            amount: response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 500 refers to 500 paise
            currency: "INR",
            name: "E-HealthCare Portal",
            description: "Doctor fees",
            order_id: response.data.id, // changed & working
            handler: async (response) => {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              console.log("Payment Successful");
              bookAppointment(e);
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "E-HealthCarePune",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var rzp = new window.Razorpay(options);
          rzp.on("payment.failed", function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            alert("OOPS!! payment failed");
          });
          rzp.open();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("oops!! please try again");
      });
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    console.log(appointment);
    axios
      .post(`${base_url}/patient/${id}/appointment`, appointment, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Your Appointment is Booked");
        setAppointment(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Please try later");
      });
    navigate("/patient/appointment");
  };

  useEffect(() => {
    setTimeSlots(creatTimeSlot("08:00", "20:00"));
    getDepartments();
    setAppointment({ ...appointment, patientId: id });
  }, []);

  useEffect(() => {}, [appointment.online]);

  const getTiming = (date) => {
    console.log("doctor id " + appointment.doctorId + " date " + date);
    if (appointment.doctorId != "" && date != "") {
      axios
        .post(
          `${base_url}/patient/${id}/doctor-timing`,
          {
            doctorId: appointment.doctorId,
            date: date,
          },
          { headers: authHeader() }
        )
        .then((response) => {
          console.log(response.data);

          response.data.map((time) => {
            bookTimings.push(time.substr(0, 5));
          });
          console.log(bookTimings);
          console.log(timeslots);
          setTimeSlots(timeslots.filter((slot) => !bookTimings.includes(slot)));
        });
    }
  };

  return (
    <div>
      <Col md={9}>
        <h2 className="my-3">Book Appointment</h2>
        <hr />
        <form>
          <FormGroup>
            <Label for="dept">
              <b>Department:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>{" "}
            </Label>
            <Input
              id="dept"
              name="dept"
              type="select"
              value={appointment.deptName}
              onChange={(e) => {
                getDoctorList(e.target.value);
                console.log(e.target.value);
                setAppointment({
                  ...appointment,
                  deptName: e.target.value,
                  doctorName: "",
                  doctorId: "",
                });
                if (e.target.value == "") {
                  setIsDisabled(true);
                } else {
                  setIsDisabled(false);
                }
                console.log(appointment);
              }}
              required
            >
              <option value="">--Please choose a Department--</option>
              {departmentList.map((dept) => {
                return (
                  <option value={dept.deptName}>
                    {dept.deptName}
                    <sub>
                      <span>
                        <p>(Description : </p>
                        {dept.deptDesc})
                      </span>
                    </sub>
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="doctor">
              <b>Doctor:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>{" "}
            </Label>
            <Input
              id="doctor"
              name="doctor"
              type="select"
              value={appointment.department == "" ? "" : appointment.doctorName}
              onChange={(e) => {
                setAppointment({
                  ...appointment,
                  doctorName: e.target.value,
                  doctorId: doctorList.filter(
                    (doc) => doc.name == e.target.value
                  )[0].id,
                  fees: doctorList.filter(
                    (doc) => doc.name == e.target.value
                  )[0].fees,
                });

                getTiming();
              }}
              disabled={isDisabled}
              required
            >
              <option value="">--Please choose Doctor--</option>

              {doctorList.map((doc) => {
                return <option value={doc.name}>{doc.name}</option>;
              })}
            </Input>
          </FormGroup>
          <FormGroup row>
            <Label for="fees" sm={2}>
              <b>Fees:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>
            </Label>
            <Col sm={10}>
              <Input
                id="fees"
                name="fees"
                value={appointment.fees}
                placeholder="Doctor Fees"
                type="number"
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="date">
              <b>Date</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              autoComplete="off"
              min={startDate}
              max={endDate}
              value={appointment.date}
              onChange={(e) => {
                setAppointment({ ...appointment, date: e.target.value });
                getTiming(e.target.value);
              }}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">
              <b>Time</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>
            </Label>
            <Input
              id="time"
              name="time"
              type="select"
              value={appointment.appointmentTime}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appointmentTime: e.target.value,
                })
              }
              required
            >
              <option value="">--Please Choose time--</option>

              {timeslots.map((item, index) => {
                return (
                  <option value={item}>
                    {timeslots[index + 1]
                      ? item + " - " + timeslots[index + 1] // time slots
                      : ""}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="">
              <b>Booking Type:</b>
              <span className="asterik" style={{ color: "red" }}>
                <b>&nbsp;*</b>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="appointmentType"
                id="online"
                value={true}
                onChange={(e) => {
                  setPayment(true);
                  setAppointment({ ...appointment, online: e.target.value });
                }}
                required
              />
              <label className="form-check-label" for="appointmentType">
                Online
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="appointmentType"
                id="Offline"
                value={false}
                onChange={(e) => {
                  setPayment(false);
                  setAppointment({ ...appointment, online: e.target.value });
                }}
                required
              />
              <label className="form-check-label" for="appointmentType">
                Offline
              </label>
            </div>
          </FormGroup>
          {payment === true && (
            <button
              type="button"
              onClick={(e) => {
                onlineRazorPay(e, appointment.fees);
                console.log("True condition");
              }}
              className="btn btn-info"
            >
              Payment
            </button>
          )}
          {payment === false && (
            <button
              type="submit"
              onClick={(e) => {
                bookAppointment(e);
              }}
              className="btn btn-info"
            >
              Book Appointment
            </button>
          )}
        </form>
      </Col>
    </div>
  );
};

export default BookAppointment;
