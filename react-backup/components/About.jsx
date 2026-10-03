import React from "react";
import memberData from "./content/memberData";
import AboutCard from "./AboutCard";

const About = () => {
  return (
    <div>
      <AboutCard
        images={"./images/vikas.jpg"}
        name={memberData["vikas"].name}
        content={memberData["vikas"].works}
      />
      <AboutCard
        images={"./images/arvind.jpeg"}
        name={memberData["arvind"].name}
        content={memberData["arvind"].works}
      />
      <AboutCard
        images={"./images/varun.jpeg"}
        name={memberData["varun"].name}
        content={memberData["varun"].works}
      />
    </div>
  );
};

export default About;
