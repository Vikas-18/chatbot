import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./css/chat.css";

const ChatBot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleResponse = (userText) => {
    const chatbox = document.getElementById("chatbox");

    // User Message
    const userMessage = document.createElement("p");
    userMessage.classList.add("userText");
    userMessage.innerHTML = `<span>${userText}</span>`;
    chatbox.appendChild(userMessage);

    // Bot Response
    setTimeout(() => {
      const botResponse = getBotResponse(userText);
      const botMessage = document.createElement("p");
      botMessage.classList.add("botText");
      botMessage.innerHTML = `<span>${botResponse}</span>`;
      chatbox.appendChild(botMessage);

      document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }, 1000);
  };
  const handleRedirect = () => {
    // Redirect the user to the "/complain" route
    navigate("/complain");
  };

  const getBotResponse = (userText) => {
    let response = "";

    if (userText === "Menu") {
      response = `1. Electricity<br>2. Water<br>3. Furniture<br>4.Room-Cleaning<br> 5.Food<br>6.Ragging<br>7.Others`;
    } else if (userText === "1") {
      handleRedirect();
    } else if (userText === "2") {
      handleRedirect();
    } else if (userText === "3") {
      handleRedirect();
    } else if (userText === "4") {
      handleRedirect();
    } else if (userText === "5") {
      handleRedirect();
    } else if (userText === "6") {
      handleRedirect();
    } else if (userText === "7") {
      handleRedirect();
    }

    return response;
  };

  const handleMenuClick = () => {
    const userText = "Menu";
    handleResponse(userText);
  };

  const handleOptionSelection = (option) => {
    handleResponse(option);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const userText = e.target.value;
      e.target.value = "";

      if (userText.trim() === "1") {
        handleOptionSelection("1"); // Handle option 1
      } else if (userText.trim() === "2") {
        handleOptionSelection("2"); // Handle option 2
      } else if (userText.trim() === "3") {
        handleOptionSelection("3"); // Handle option 3
      } else if (userText.trim() === "4") {
        handleOptionSelection("4"); // Handle option 4
      } else if (userText.trim() === "5") {
        handleOptionSelection("5"); // Handle option 5
      } else if (userText.trim() === "6") {
        handleOptionSelection("6"); // Handle option 6
      } else if (userText.trim() === "7") {
        handleOptionSelection("7"); // Handle option 7
      } else {
        handleMenuClick(); // Open main menu
      }
    }
  };

  const handleIconPress = () => {
    const inputElement = document.getElementById("textInput");
    const userText = inputElement.value;
    inputElement.value = "";

    if (userText.trim() === "1") {
      handleOptionSelection("1"); // Handle option 1
    } else if (userText.trim() === "2") {
      handleOptionSelection("2"); // Handle option 2
    } else if (userText.trim() === "3") {
      handleOptionSelection("3"); // Handle option 3
    } else if (userText.trim() === "4") {
      handleOptionSelection("4"); // Handle option 4
    } else if (userText.trim() === "5") {
      handleOptionSelection("5"); // Handle option 5
    } else if (userText.trim() === "6") {
      handleOptionSelection("6"); // Handle option 6
    } else if (userText.trim() === "7") {
      handleOptionSelection("7"); // Handle option 7
    } else {
      handleMenuClick(); // Open main menu
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div id="top">
          <img
            src="./images/chatbot.png"
            alt="ChatBot"
            className="navbar-brand"
          />
          <h1>Hostel Chat Bot</h1>
        </div>

        <div className="chat-container">
          <div id="chatbox">
            <p id="botStartMessage" className="botText">
              <span>
                Hello, My name is Hostel ChatBot <br /> How can I help You
                <br /> For Main menu
                <button className="btnc" onClick={handleMenuClick}>
                  Main Menu
                </button>
              </span>
            </p>
          </div>
          <div className="chat-bar-input-block">
            <div id="userInput">
              <input
                type="text"
                id="textInput"
                className="input-box"
                name="msg"
                placeholder="Tap 'Enter' to send a message"
                onKeyPress={handleKeyPress}
              />
              <p></p>
            </div>
            <div className="chat-bar-icons">
              <FontAwesomeIcon
                id="chat-icon"
                icon={faPaperPlane}
                className="hvr-grow"
                style={{ color: "black", fontSize: "2rem" }}
                onClick={handleIconPress}
              />
            </div>
          </div>
        </div>
        <div id="chat-bar-bottom">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
