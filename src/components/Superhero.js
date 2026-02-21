import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import antmanImage from "../assets/images/superhero/antman.jpg";
import avengerImage from "../assets/images/superhero/avenger.jpg";
import batmanImage from "../assets/images/superhero/batman.jpg";
import robinhoodImage from "../assets/images/superhero/robinhood.jpg";
import spidermanImage from "../assets/images/superhero/spiderman-cover.jpg";
import supermanImage from "../assets/images/superhero/superman.jpg";
import { useState } from "react";

const SuperHero = () => {
  const movies = [
    { id: 1, title: "ANT MAN", image: antmanImage, platform: "NETFLIX" },
    { id: 2, title: "AVENGER", image: avengerImage, platform: "HBOMax" },
    { id: 3, title: "THE BATMAN", image: batmanImage, platform: "Sky Cinema" },
    { id: 4, title: "ROBIN HOOD", image: robinhoodImage, platform: "Disney+" },
    { id: 5, title: "SPIDERMAN", image: spidermanImage, platform: "NETFLIX" },
    { id: 6, title: "SUPERMAN HERO", image: supermanImage, platform: "Sky Cinema" },
    { id: 7, title: "SUPERMAN HERO", image: supermanImage, platform: "Sky Cinema" },
    { id: 8, title: "SUPERMAN HERO", image: supermanImage, platform: "Sky Cinema" },
  ];

  return (
    <div id="superhero" className="py-5">
      <Container>
        <div className="d-flex gap-5">
          <h4 className="text-white">SUPERHERO MOVIES</h4>
        </div>

        <div className="horizontal-scroll-wrapper">
          {movies.map((movie, index) => (
            <div key={index} className="horizontal-scroll-item">
              <ModernMovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                platform={movie.platform}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SuperHero;
