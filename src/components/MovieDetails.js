import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import FavoriteButton from "./FavoriteButton";
import ReviewSection from "./ReviewSection";
import { movieCache } from "../utils/movieCache";

const MovieDetails = ({ movieId, mediaType = "movie" }) => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = (process.env.REACT_APP_APIKEY || "").trim();
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL_BACKDROP = "https://image.tmdb.org/t/p/original";
  const IMG_URL_POSTER = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieData = async () => {
      const cacheKey = `${mediaType}_${movieId}`;
      const cached = movieCache.get(cacheKey);

      if (cached) {
        setMovie(cached.movie);
        setRecommendations(cached.recommendations);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const detailRes = await fetch(
          `${BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}`,
        );
        const detailData = await detailRes.json();
        setMovie(detailData);

        const recRes = await fetch(
          `${BASE_URL}/${mediaType}/${movieId}/recommendations?api_key=${API_KEY}`,
        );
        const recData = await recRes.json();
        
        let finalRecs = recData.results || [];
        if (finalRecs.length === 0) {
          const similarRes = await fetch(
            `${BASE_URL}/${mediaType}/${movieId}/similar?api_key=${API_KEY}`,
          );
          const similarData = await similarRes.json();
          finalRecs = similarData.results || [];
        }
        
        setRecommendations(finalRecs);
        movieCache.set(cacheKey, { movie: detailData, recommendations: finalRecs });
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId, mediaType, API_KEY]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!movie) {
    return <div className="text-white text-center">Not found</div>;
  }

  // TV shows use "name" instead of "title", "first_air_date" instead of "release_date"
  const displayTitle = movie.title || movie.name;
  const displayDate = movie.release_date || movie.first_air_date;
  const displayRuntime = mediaType === "tv"
    ? (movie.episode_run_time?.[0] ? `${movie.episode_run_time[0]} min/ep` : `${movie.number_of_seasons} season${movie.number_of_seasons > 1 ? 's' : ''}`)
    : `${movie.runtime} min`;

  return (
    <div className="movie-detail-container">
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), #000), url(${IMG_URL_BACKDROP}${movie.backdrop_path})`,
        }}
      ></div>

      <div style={{ height: "150px" }}></div>
      <Container className="detail-content py-5">
        <Row className="align-items-start">
          <Col md={4} lg={3} className="mb-4">
            <div className="detail-poster-wrapper">
              <img
                src={`${IMG_URL_POSTER}${movie.poster_path}`}
                alt={displayTitle}
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </Col>

          <Col md={8} lg={9} className="text-white ps-md-4">
            <div className="studio-logo mb-2">{mediaType === "tv" ? "TV SHOW DETAILS" : "MOVIE DETAILS"}</div>
            <h1 className="display-5 fw-medium mb-3">{displayTitle}</h1>

            <div className="meta-info d-flex gap-3 mb-4">
              <span className="rating text-warning">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              <span>{displayDate?.substring(0, 4)}</span>
              <span>{displayRuntime}</span>
              <span className="text-uppercase">{movie.original_language}</span>
            </div>

            {/* Favorite Button */}
            <div className="mb-4">
              <FavoriteButton
                movieId={movieId}
                mediaType={mediaType}
                title={displayTitle}
                posterPath={movie.poster_path}
              />
            </div>

            <div className="mb-4">
              <h5 className="text-secondary text-uppercase mb-2">Genres</h5>
              <div className="d-flex gap-2 flex-wrap">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="badge bg-danger rounded-pill px-3 py-2"
                  >
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

        {/* Review Section */}
        <ReviewSection movieId={movieId} mediaType={mediaType} />

        {recommendations.length > 0 && (
          <div className="mt-5">
            <h4 className="text-white mb-4">RECOMMENDATIONS</h4>
            <div className="horizontal-scroll-wrapper">
              {recommendations.map((rec, index) => (
                <div key={index} className="horizontal-scroll-item">
                  <ModernMovieCard
                    id={rec.id}
                    title={rec.title || rec.name}
                    image={`${IMG_URL_POSTER}${rec.poster_path}`}
                    platform={rec.vote_average?.toFixed(1)}
                    date={rec.release_date || rec.first_air_date}
                    mediaType={mediaType}
                  />
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
