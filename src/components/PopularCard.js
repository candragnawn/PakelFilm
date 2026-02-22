import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


const Popular = () => {
  const [trendMovies, setMovies] = useState([]);
  const IMG_URL = (
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280"
  ).trim();
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate("/movie?sort=popularity.desc")
  }

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div id="popular" className="py-5">
      <Container>
        <div className="d-flex gap-3 justify-content-between">
          <h4 className="text-white">POPULAR MOVIES</h4>
          <Button
            variant="outline-light"
            className="px-3 filter-btn"
            onClick={handleSeeAll}
          >
            SEE ALL
          </Button>
        </div>

        <div className="horizontal-scroll-wrapper">
          {trendMovies &&
            trendMovies.map((movie, index) => (
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

export default Popular;
