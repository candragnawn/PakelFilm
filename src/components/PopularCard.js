import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import TimeFilter from "./TimeFilter";

import { useState } from "react";
import { useEffect } from "react";

const Popular = () => {
  const [trendMovies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(false);
  const IMG_URL = (
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280"
  ).trim();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div id="popular" className="py-5">
      <Container>
        <div className="d-flex gap-3">
          {" "}
          <h4 className="text-white">POPULAR MOVIES</h4>
        </div>

        <div className="horizontal-scroll-wrapper">
          {trendMovies && trendMovies.map((movie, index) => (
            <div key={index} className="horizontal-scroll-item">
              <ModernMovieCard
                title={movie.title}
                image={
                  movie.poster_path
                    ? `${IMG_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                platform={movie.vote_average?.toFixed(1)}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Popular;
