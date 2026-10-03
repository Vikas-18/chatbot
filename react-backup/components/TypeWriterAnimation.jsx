import Typewriter from "typewriter-effect";
import "./css/typewriter.css";

const TypeWriterAnimation = () => {
  return (
    <div className="container-chatbotmob">
      <img
        className="chatbotmob"
        src="./images/chatbotmob.png"
        alt="chatbot icon"
      />
      <div className="text-container">
        <h1 className="heading">We The Team</h1>
        <h1 className="typewriter">
          <Typewriter
            options={{
              strings: [
                "The Innovation Ninjas",
                "Presents",
                "The Hostel ChatBot",
              ],
              autoStart: true,
              loop: true,
              typeSpeed: 50, // Adjust the typing speed (in milliseconds)
              delay: 200, // Adjust the delay between strings (in milliseconds)
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default TypeWriterAnimation;
