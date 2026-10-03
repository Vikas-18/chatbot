import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./css/signin.css";

const LogIn = () => {
  const navigate = useNavigate();
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const userData = {
      enrollmentNumber,
      password,
    };

    // Send a POST request to the backend API
    axios
      .post("https://hostelchatbotnitrr.onrender.com/login", userData)
      .then((response) => {
        // Handle the response as needed
        if (response.data.success) {
          // User login successful
          const token = response.data.token;

          // Store the token in local storage
          localStorage.setItem("token", token);

          // Redirect to chatbot component
          navigate("/chatbot");
        } else {
          // User already exists
          toast.error("User already exists.");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
        if (error.response && error.response.status === 409) {
          toast.error("User already exists.");
        } else {
          toast.error("EnrollmentNumber Does Not Exist/ Password Incorrect");
          setTimeout(() => {
            // Redirect to /signup route
            navigate("/signup");
          }, 3000);
        }
      });
  };

  return (
    <div className="form-container">
      <div className="container-lg">
        <div className="head">
          <h1>Hostel Chat Bot</h1>
        </div>
        <div className="signin">
          <h2>Log In To Your Account</h2>

          <form method="post" onSubmit={handleSubmit}>
            <ToastContainer />
            <div className="form-group">
              <label htmlFor="enrollmentNumber" className="form-label">
                Enrollment Number
              </label>
              <input
                type="text"
                className="form-control"
                id="enrollmentNumber"
                name="enrollmentnumber"
                placeholder="Enter Your Enrollment Number"
                required
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
