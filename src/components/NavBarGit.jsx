import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/navbar.css";

function NavBarGit() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <img
            className="chatbot"
            src="./images/chatbot.png"
            alt="chatbot icon"
          />

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                href="mailto:hostelchatbot544@gmail.com"
                className="nav-links"
                onClick={handleClick}
              >
                Feedback
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                LogIn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signup"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                SignUp
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Admin
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarGit;
