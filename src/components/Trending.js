import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";

import { useState } from "react";
import { useEffect } from "react";

const Trending = () => {
  const [trendMovies, setMovies] = useState([]);
  const IMG_URL = process.env.REACT_APP_BASEIMGURL;

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_APIKEY}`,
      );

      const data = await response.json();
      setMovies(data.results);
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
                image={`${IMG_URL}${movie.poster_path}`}
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
