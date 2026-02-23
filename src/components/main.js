import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const IMG_URL = (
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/original"
  ).trim();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
        );
        const data = await response.json();
        setMovies(data.results ? data.results.slice(1, 5) : []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div className="hero-container" id="Hero">
      <Carousel fade indicators={false} controls={true} className="w-100">
        {movies.map((movie, index) => (
          <Carousel.Item key={index}>
            <div className="hero-backdrop-wrapper">
              {movie.backdrop_path ? (
                <img
                  className="d-block w-100 hero-img"
                  src={`${IMG_URL}${movie.backdrop_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="hero-img bg-dark d-flex align-items-center justify-content-center">
                  <span className="text-secondary">No Backdrop Available</span>
                </div>
              )}
              <div className="hero-overlay-content">
                <Container>
                  <Row className="align-items-center h-100">
                    <Col md={10} lg={7}>
                      <div className="studio-logo mb-3">UPCOMING</div>
                      <h1 className="title-premium mb-3">{movie.title}</h1>
                      <div className="meta-info d-flex gap-3 mb-4">
                        <span className="rating">
                          ⭐ {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="year">
                          {movie.release_date?.substring(0, 4)}
                        </span>
                        <span className="language">
                          {movie.original_language?.toUpperCase()}
                        </span>
                      </div>
                      <p className="description-text mb-5">
                        {movie.overview?.length > 200
                          ? movie.overview.substring(0, 150) + "..."
                          : movie.overview}
                      </p>
                      <div className="d-flex gap-3">
                        <Button
                          className="btn-pill-red px-4 py-3"
                          href="#trending"
                        >
                          Explore Movies →
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
