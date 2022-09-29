import axios from "axios";
import base_url from "../boot-api";
import { toast } from "react-toastify";

const login = async (user) => {
  let path = "";

  //getting the JWT token from the backEnd
  return await axios
    .post(`${base_url}/login`, user)
    .then((response) => {
      console.log(response.data);
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      //navigating by checking the role of user
      if (response.data.userType === "[ROLE_ADMIN]") {
        path = "/admin";
      } else if (response.data.userType === "[ROLE_DOCTOR]") {
        path = "/doctor/appointment";
      } else if (response.data.userType === "[ROLE_PATIENT]") {
        path = "/patient";
      }
      console.log(path);
      return path;
    })
    .catch((error) => {
      if (error.response?.status === 401) toast.error("Invalid Credentials");
    });
};

// removing the variables from the local storage
const logout = () => {
  localStorage.clear();
};

const authService = { login, logout };

export default authService;
