import { Container, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

const Genre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const apiKey = (process.env.REACT_APP_APIKEY || "").trim();
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenre();
  }, []);

  return (
    <div id="Genre">
      <Container className="mt-4">
        <Nav className="justify-content-center">
          {genres.map((genre) => (
            <Nav.Item key={genre.id}>
              {/* <Nav.Link href={`#${genre.name}`} className="genre-text">
                {genre.name}
              </Nav.Link> */}
            </Nav.Item>
          ))}
        </Nav>
      </Container>
    </div>
  );
};

export default Genre;
