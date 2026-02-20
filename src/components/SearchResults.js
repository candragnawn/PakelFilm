import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";

const SearchResults = ({ query }) => {
  const [mainMovie, setMainMovie] = useState(null); // Untuk data highlight paling atas
  const [recommendations, setRecommendations] = useState([]); // Untuk slider bawah
  const [loading, setLoading] = useState(false);

  const IMG_URL = process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280";
  const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
  const API_KEY = process.env.REACT_APP_APIKEY;

  useEffect(() => {
    const fetchSearchAndRecs = async () => {
      setLoading(true);
      try {
       
        const searchRes = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
        );
        const searchData = await searchRes.json();
        const topResult = searchData.results[0]; // Ambil hasil paling relevan (paling atas)
        setMainMovie(topResult);

       
        if (topResult) {
          const recRes = await fetch(
            `https://api.themoviedb.org/3/${topResult.media_type || 'movie'}/${topResult.id}/recommendations?api_key=${API_KEY}`
          );
          const recData = await recRes.json();
          setRecommendations(recData.results || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchAndRecs();
  }, [query, API_KEY]);

  if (loading || !mainMovie) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="search-detail-wrapper">
      {/* --- SECTION 1: BACKDROP & DETAIL --- */}
      <div 
        className="search-hero" 
        style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${BACKDROP_URL}${mainMovie.backdrop_path})` }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <img 
                src={`${IMG_URL}${mainMovie.poster_path}`} 
                alt={mainMovie.title} 
                className="img-fluid rounded shadow-lg poster-highlight"
              />
            </Col>
            <Col md={8} className="text-white mt-4 mt-md-0">
              <h1 className="display-4 fw-bold">{mainMovie.title || mainMovie.name}</h1>
              <p className="text-warning fw-bold fs-5">⭐ {mainMovie.vote_average?.toFixed(1)} | {mainMovie.release_date || mainMovie.first_air_date}</p>
              <h5 className="mt-4">Overview</h5>
              <p className="lead" style={{ fontSize: '1rem', opacity: 0.8 }}>{mainMovie.overview}</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* --- SECTION 2: RECOMMENDATIONS (Slider Style) --- */}
      <Container className="py-5">
        <h4 className="text-white mb-4">RECOMMENDATIONS FOR YOU</h4>
        <div className="horizontal-scroll-wrapper">
          {recommendations.map((movie, index) => (
            <div key={index} className="horizontal-scroll-item">
              <ModernMovieCard
                title={movie.title || movie.name}
                image={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750"}
                platform={movie.vote_average?.toFixed(1)}
                date={movie.release_date || movie.first_air_date}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SearchResults;