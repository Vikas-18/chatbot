import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/card.css";

const Card = ({ animation, content, images, float }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="content" data-aos={animation}>
      <img className={float} src={images} alt="worker" />
      <p className="description">{content}</p>
    </div>
  );
};

export default Card;
