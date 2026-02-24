import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import TimeFilter from "./TimeFilter";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

const Trending = () => {
  const [trendMovies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(false);
  const IMG_URL = (
    process.env.REACT_APP_BASEIMGURL || "https://image.tmdb.org/t/p/w1280"
  ).trim();
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate("/all");
  };

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${apiKey}`,
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, [timeWindow]);

  return (
    <div id="trending" className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4gap-3">
          <h4 className="text-white justify-content-start">TRENDING</h4>
          <Button
            variant="outline-light"
            className="px-3 filter-btn"
            onClick={handleSeeAll}
          >
            SEE ALL
          </Button>
        </div>
        <div className="d-flex">
          <TimeFilter current={timeWindow} onChange={setTimeWindow} />
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

export default Trending;
