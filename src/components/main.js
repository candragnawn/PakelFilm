import { Carousel } from "react-bootstrap";
import mainImage from "../assets/images/bg/21.jpg";
import romanceImage from "../assets/images/bg/romance.jpg";
import spidermanImage from "../assets/images/bg/spiderman (2).jpg";

import { useState } from "react";
import { useEffect } from "react";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const IMG_URL = process.env.REACT_APP_BASEIMGURL;

  useEffect(() => {
    const HeroSection = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_APIKEY}`,
      );

      const data = await response.json();
      setMovies(data.results);
    };
    HeroSection();
  }, []);
  return (
    <div className="hero-container">
      <Carousel fade>
        {movies.map((movie, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 hero-img"
              src={`${IMG_URL}${movie.poster_path}`}
              alt="Slide image alt"
            />
            <Carousel.Caption className="hero-txt"></Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
