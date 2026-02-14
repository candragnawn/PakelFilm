import { Carousel, Col, Row, Container } from "react-bootstrap";
import mainImage from "../assets/images/bg/main.jpg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src={mainImage}
            alt="Slide image alt"
          />
          <Carousel.Caption className="hero-txt">
            <p>Caption for slide</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSection;
