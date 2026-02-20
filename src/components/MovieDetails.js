import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import { Link } from "react-router-dom";

const MovieDetails = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = (process.env.REACT_APP_APIKEY || "").trim();
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL_BACKDROP = "https://image.tmdb.org/t/p/original";
  const IMG_URL_POSTER = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        // Fetch Movie Details
        const detailRes = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        const detailData = await detailRes.json();
        setMovie(detailData);

        // Fetch Recommendations
        const recRes = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
        const recData = await recRes.json();
        setRecommendations(recData.results || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId, API_KEY]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!movie) {
    return <div className="text-white text-center">Movie not found</div>;
  }

  return (
    <div className="movie-detail-container">
      <div 
        className="detail-backdrop"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), #000), url(${IMG_URL_BACKDROP}${movie.backdrop_path})` 
        }}
      ></div>

      <Container className="detail-content py-5">
        <Row className="align-items-start">
          {/* Poster Section */}
          <Col md={4} lg={3} className="mb-4">
            <div className="detail-poster-wrapper">
              <img 
                src={`${IMG_URL_POSTER}${movie.poster_path}`} 
                alt={movie.title} 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </Col>

          {/* Info Section */}
          <Col md={8} lg={9} className="text-white ps-md-4">
            <div className="studio-logo mb-2">MOVIE DETAILS</div>
            <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
            
            <div className="meta-info d-flex gap-3 mb-4">
              <span className="rating text-warning">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date?.substring(0, 4)}</span>
              <span>{movie.runtime} min</span>
              <span className="text-uppercase">{movie.original_language}</span>
            </div>

            <div className="mb-4">
              <h5 className="text-secondary text-uppercase mb-2">Genres</h5>
              <div className="d-flex gap-2 flex-wrap">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge bg-danger rounded-pill px-3 py-2">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h5 className="text-secondary text-uppercase mb-2">Overview</h5>
              <p className="lead" style={{ lineHeight: "1.8", color: "#ddd" }}>
                {movie.overview}
              </p>
            </div>
          </Col>
        </Row>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-5">
            <h4 className="text-white mb-4">RECOMMENDATIONS</h4>
            <div className="horizontal-scroll-wrapper">
              {recommendations.map((rec, index) => (
                <div key={index} className="horizontal-scroll-item">
                  <Link to={`/movie/${rec.id}`} style={{ textDecoration: "none" }}>
                    <ModernMovieCard
                      title={rec.title}
                      image={`${IMG_URL_POSTER}${rec.poster_path}`}
                      platform={rec.vote_average?.toFixed(1)}
                      date={rec.release_date}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MovieDetails;
