import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import base_url from "../../../boot-api";
import { Button, Col } from "reactstrap";
import authHeader from "../../../Services/auth-header";

const GetDoctorByDeptName = () => {
  const params = useParams();
  const [doctorList, setDoctorList] = useState([]);

  const showDoctor = (deptName) => {
    axios.get(`${base_url}/admin/${deptName}`, { headers: authHeader() }).then(
      (response) => {
        setDoctorList(response.data);
        //response from server
        console.log(response.data);
        // toast.success("Doctor List fetched !");
      },
      (error) => {
        //error handling
        toast.error("Somthing went wrong !");
        console.log(error);
      }
    );
  };

  const handleDelete = (id) => {
    console.log("Printing id", id);
    axios
      .delete(`${base_url}/admin/Doctor/${id}`, { headers: authHeader() })
      .then((response) => {
        console.log("doctor deleted successfully", response.data);
        toast.success("You have deleted this doctor");
        setDoctorList(doctorList.filter((doctor) => doctor.id != id));
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error("You can't delete this doctors");
      });
  };

  useEffect(() => {
    console.log(params.deptName);
    showDoctor(params.deptName ? params.deptName : "Orthopaedics");
  }, [params.deptName]);

  return (
    <div className="mt-3">
      <h3 id="text">
        List of {params.deptName ? params.deptName : "Orthopaedics"} Doctors
      </h3>
      <hr />
      <div className="mt-3">
        <Link to="/admin/doctors/addDoctor">
          <Button color="info">Add Doctor</Button>
        </Link>
      </div>
      <Col md={10}>
        {doctorList.length == 0 ? (
          <h1>
            No doctors found in{" "}
            {params.deptName ? params.deptName : "Orthopaedics"} Department
          </h1>
        ) : (
          <div>
            <table className="table table-bordered table-striped mt-3">
              <tbody>
                {doctorList.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name} </td>
                    <td>{doctor.gender} </td>
                    <td>{doctor.email} </td>
                    <td>{doctor.fees} </td>
                    <td>{doctor.working ? "true" : "false"}</td>
                    <td>{doctor.validated ? "true" : "false"}</td>
                    <td>
                      <Link
                        className="btn btn-info mx-3"
                        to={`/admin/doctors/updateDoctor/${doctor.id}`}
                      >
                        Update
                      </Link>

                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          handleDelete(doctor.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Col>
    </div>
  );
};

export default GetDoctorByDeptName;
