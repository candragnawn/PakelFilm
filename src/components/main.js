import { Carousel } from "react-bootstrap";
import mainImage from "../assets/images/bg/21.jpg";
import romanceImage from "../assets/images/bg/romance.jpg";
import spidermanImage from "../assets/images/bg/spiderman (2).jpg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src={mainImage}
            alt="Slide image alt"
          />
          <Carousel.Caption className="hero-txt"></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src={mainImage}
            alt="Slide image alt"
          />
          <Carousel.Caption className="hero-txt"></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src={romanceImage}
            alt="Slide image alt"
          />
          <Carousel.Caption className="hero-txt"></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSection;
