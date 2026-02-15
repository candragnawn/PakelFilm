import { Carousel, Col, Row, Container } from "react-bootstrap";
import mainImage from "../assets/images/bg/21.jpg";
import romanceImage from "../assets/images/bg/romance.jpg";

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
          <Carousel.Caption className="hero-txt">
            <p>Caption for slide</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSection;
