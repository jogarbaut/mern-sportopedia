import React from "react";
import CustomCarousel from "../components/CustomCarousel";
import ProgramCardRight from "../components/ProgramCardRight";

// Images
import carousel1 from "../assets/images/carousel1.jpeg";
import carousel2 from "../assets/images/carousel2.jpeg";
import carousel3 from "../assets/images/carousel3.jpeg";
import ProgramCardLeft from "../components/ProgramCardLeft";
import Divider from "../components/Divider";

const Home = () => {
  return (
    <>
      <CustomCarousel />

      <ProgramCardRight
        title={"Who We Are"}
        subtitle={"Elite Basketball Program"}
        description={
          "San Diego Relentless is an elite basketball program located in San Diego county that inspires and promotes high level youth development by providing athletic, educational, and individual growth."
        }
        image={carousel1}
        imageAlt={"Who We Are Image"}
      />

      <Divider />

      <ProgramCardLeft
        title={"Honesty, Accountability, Teamwork"}
        subtitle={"On and Off the Court"}
        description={
          "We are committed to developing character, teamwork, and sportsmanship in a competitive but enjoyable environment. We educate and empower young athletes with confidence, commitment, and integrity so they can live a productive and successful tomorrow both on and off the court."
        }
        image={carousel3}
        imageAlt={"Honesty Image"}
      />

      <Divider />

      <ProgramCardRight
        title={"Core Values"}
        subtitle={"Love and Trust the Process"}
        description={
          "Positive coaching with expert teaching sportsmanship and teamwork in a competitive environment. Learn life lessons that will provide value off the court. Develop individual and team skill sets for the next level of basketball."
        }
        image={carousel2}
        imageAlt={"Core Values Image"}
      />
    </>
  );
};

export default Home;
