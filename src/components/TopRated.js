import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const IMG_URL = (
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280"
  ).trim();

  const navigate = useNavigate();
  const handleSeeALL = () => {
    navigate("/movie?sort=vote_average.desc")
  };

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
        );
        const data = await response.json();
        setTopRated(data.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };
    fetchTopRated();
  }, []);

  return (
    <div id="topRated" className="py-5">
      <Container>
        <div className="d-flex justify-content-between gap-3">
          <h4 className="text-white">TOP RATED MOVIES</h4>
          <Button
            variant="outline-light"
            className="px-3 filter-btn"
            onClick={handleSeeALL}
          >
            SEE ALL
          </Button>
        </div>

        <div className="horizontal-scroll-wrapper">
          {topRated &&
            topRated.map((movie, index) => (
              <div key={index} className="horizontal-scroll-item">
                <ModernMovieCard
                  id={movie.id}
                  title={movie.title || movie.name}
                  image={
                    movie.poster_path
                      ? `${IMG_URL}${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
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

export default TopRated;
