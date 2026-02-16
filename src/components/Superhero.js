import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import antmanImage from "../assets/images/superhero/antman.jpg";
import avengerImage from "../assets/images/superhero/avenger.jpg";
import batmanImage from "../assets/images/superhero/batman.jpg";
import robinhoodImage from "../assets/images/superhero/robinhood.jpg";
import spidermanImage from "../assets/images/superhero/spiderman-cover.jpg";
import supermanImage from "../assets/images/superhero/superman.jpg";

const SuperHero = () => {
  const movies = [
    { title: "ANT MAN", image: antmanImage, platform: "NETFLIX" },
    { title: "AVENGER", image: avengerImage, platform: "HBOMax" },
    { title: "THE BATMAN", image: batmanImage, platform: "Sky Cinema" },
    { title: "ROBIN HOOD", image: robinhoodImage, platform: "Disney+" },
    { title: "SPIDERMAN", image: spidermanImage, platform: "NETFLIX" },
    { title: "SUPERMAN HERO", image: supermanImage, platform: "Sky Cinema" },
    { title: "SUPERMAN HERO", image: supermanImage, platform: "Sky Cinema" },
    { title: "SUPERMAN HERO", image: supermanImage, platform: "Sky Cinema" },
  ];

  return (
    <div id="superhero" className="py-5">
      <Container>
        <h3 className="text-white">SUPERHERO MOVIES</h3>
        <div className="horizontal-scroll-wrapper">
          {movies.map((movie, index) => (
            <div key={index} className="horizontal-scroll-item">
              <ModernMovieCard
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
