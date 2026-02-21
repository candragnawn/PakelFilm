import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = (process.env.REACT_APP_APIKEY || "").trim();
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        
        const filteredResults = (data.results || []).filter(
          item => item.media_type === "movie" || item.media_type === "tv" || !item.media_type
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, API_KEY]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  return (
    <Container className="py-6" style={{ paddingTop: "150px" }}>
      <h4 className="text-white mb-4 text-uppercase letter-spacing-2">
        Search Results for: <span className="text-danger">"{query}"</span>
      </h4>
      
      {results.length > 0 ? (
        <Row className="g-4">
          {results.map((item) => (
            <Col key={item.id} xs={6} md={4} lg={3} xl={2}>
              <ModernMovieCard
                id={item.id}
                title={item.title || item.name}
                image={
                  item.poster_path 
                    ? `${IMG_URL}${item.poster_path}` 
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                platform={item.vote_average?.toFixed(1)}
                date={(item.release_date || item.first_air_date)?.substring(0, 4)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-white text-center py-5">
          <p className="lead">No results found for "{query}".</p>
        </div>
      )}
    </Container>
  );
};

export default SearchResults;