import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/card.css";

const AboutCard = ({ content, images, name }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="contentbox">
      <img className="image" src={images} alt="Member" />
      <h1>{name}</h1>
      <p className="description">{content}</p>
    </div>
  );
};

export default AboutCard;
