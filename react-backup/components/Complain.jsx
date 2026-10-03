import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/signin.css";

const Complain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const complainData = {
      name,
      email,
      contact,
      hostel,
      room,
      problem,
      comment,
    };

    // Send a POST request to the backend API
    axios
      .post("https://hostelchatbotnitrr.onrender.com/complain", complainData)
      .then((response) => {
        // Handle the response as needed
        if (response.data.success) {
          // Complain registration successful
          toast.success("Complain Registered Successfully");
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else {
          toast.error("Error Occurred, Please Try Again Later.");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
        if (error.response && error.response.status === 409) {
          toast.error("Error Occurred, Please Try Again Later.");
        }
      });
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [problem, setProblem] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div>
      <div className="form-container">
        <div className="container-lg">
          <div className="head">
            <h1>Hostel Chat Bot</h1>
          </div>
          <div className="signin">
            <h2>Register Complain</h2>

            <form method="post" onSubmit={handleSubmit}>
              <ToastContainer />
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  placeholder="Enter Your Contact Number"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hostel" className="form-label">
                  Hostel
                </label>
                <select
                  className="form-control"
                  id="hostel"
                  name="hostel"
                  placeholder="Choose Your Hostel"
                  required
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="">Choose Your Hostel</option>
                  <option value="Hostel-Mahanadi">Hostel-Mahanadi</option>
                  <option value="Hostel-Indrawati">Hostel-Indrawati</option>
                  <option value="PG Hostel">PG Hostel</option>
                  <option value="Seonath">Seonath</option>
                  <option value="Hostel-Mainput">Hostel-Mainput</option>
                  <option value="Hostel-Chitrakot">Hostel-Chitrakot</option>
                  <option value="Hostel-Malhar">Hostel-Malhar</option>
                  <option value="Hostel-Kotumsar">Hostel-Kotumsar</option>
                  <option value="Hostel-Sirpur">Hostel-Sirpur</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="room" className="form-label">
                  Room Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="room"
                  name="room"
                  placeholder="Enter Your Room Number"
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="problem" className="form-label">
                  Problem
                </label>
                <select
                  className="form-control"
                  id="problem"
                  name="problem"
                  placeholder="Choose Your Problem"
                  required
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                >
                  <option value="">Choose Your Problem</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Food">Food</option>
                  <option value="Water">Water</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Room Cleaning">Room Cleaning</option>
                  <option value="Ragging">Ragging</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="comment"
                  name="comment"
                  placeholder="Leave a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complain;
