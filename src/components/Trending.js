import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";

import { useState } from "react";
import { useEffect } from "react";

const Trending = () => {
  const [trendMovies, setMovies] = useState([]);
  const IMG_URL = (process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280").trim();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div id="trending" className="py-5">
      <Container>
        <h4 className="text-white">TRENDING MOVIES</h4>
        <div className="horizontal-scroll-wrapper">
          {trendMovies.map((movie, index) => (
            <div key={index} className="horizontal-scroll-item">
              <ModernMovieCard
                title={movie.title}
                image={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"}
                platform={movie.platform}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Trending;
