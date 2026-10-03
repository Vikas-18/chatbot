import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "./css/signin.css";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== cpassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    // Create an object with the form data
    const userData = {
      email,
      password,
      cpassword,
    };

    // Send a POST request to the backend API
    axios
      .post("https://hostelchatbotnitrr.onrender.com/signup", userData)
      .then((response) => {
        // Display toast message
        toast.success("Email registered successfully");

        // Delay the redirect by 3 second (adjust as needed)
        setTimeout(() => {
          console.log(response.data);
          // Redirect to /login route
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        toast.error("Email already exists/Password exist");
        console.error(error);
        // Handle the error as needed
      });
  };
  return (
    <div className="form-container">
      <div className="container-lg">
        <div className="head">
          <h1>Hostel Chat Bot</h1>
        </div>
        <div className="signin">
          <h2>Sign Up For Your Account</h2>

          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Re-enter Your Password"
                required
                value={cpassword}
                onChange={(e) => setcPassword(e.target.value)} // Use setcPassword for the confirm password field
              />
            </div>

            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
