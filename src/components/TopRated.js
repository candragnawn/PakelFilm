import React from "react";
import TimeFilter from "./TimeFilter";
import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";

import { useState } from "react";
import { useEffect } from "react";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const IMG_URL = (
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280"
  ).trim();

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
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchTopRated();
  }, []);
  return (
    <div id="topRated" className="py-5">
      {" "}
      <Container>
        <div className="d-flex gap-3">
          {" "}
          <h4 className="text-white">TOP RATED MOVIES</h4>
        </div>

        <div className="horizontal-scroll-wrapper">
          {topRated &&
            topRated.map((movie, index) => (
              <div key={index} className="horizontal-scroll-item">
                <ModernMovieCard
                  title={movie.title}
                  image={
                    movie.poster_path
                      ? `${IMG_URL}${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  platform={movie.vote_average?.toFixed(1)}
                  date={movie.release_date}
                />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default TopRated;
