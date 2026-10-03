import React from "react";
import Card from "./Card";
import worksData from "./content/worksData";
import TypeWriterAnimation from "./TypeWriterAnimation";
import "./css/home.css";

const HomePage = () => {
  return (
    <div>
      <TypeWriterAnimation />

      <Card
        animation="fade-left"
        content={worksData["roomCleaning"].works}
        images="./images/room-cleaning.png"
        float="animation-left"
      />
      <Card
        animation="fade-right"
        content={worksData["electrician"].works}
        images="./images/electricity.png"
        float="animation-right"
      />
      <Card
        animation="fade-left"
        content={worksData["plumber"].works}
        images="./images/plumber.png"
        float="animation-left"
      />
      <Card
        animation="fade-right"
        content={worksData["carpenter"].works}
        images="./images/carpanter.png"
        float="animation-right"
      />
      <Card
        animation="fade-left"
        content={worksData["food"].works}
        images="./images/food.png"
        float="animation-left"
      />
      <Card
        animation="fade-right"
        content={worksData["ragging"].works}
        images="./images/ragging.png"
        float="animation-right"
      />
    </div>
  );
};

export default HomePage;
