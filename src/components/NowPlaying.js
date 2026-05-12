import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const IMG_URL =
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280";
  const navigate = useNavigate();
  const handleSeeAll = () => {  
    navigate("/movie?sort=primary_release_date.desc");
  };

  useEffect(() => {
    const fetchNowplaying = async () => {
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching Now Playing movies:", error);
      }
    };
    fetchNowplaying();
  }, []);

  return (
    <div id="nowplaying" className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <h4 className="text-white">NOW PLAYING</h4>
          <Button
            variant="outline-light"
            className="px-3 filter-btn"
            onClick={handleSeeAll}
          >
            SEE ALL
          </Button>
        </div>

        <div className="horizontal-scroll-wrapper">
          {movies &&
            movies.map((movie, index) => (
              <div key={index} className="horizontal-scroll-item">
                <ModernMovieCard
                  id={movie.id}
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

export default NowPlaying;
