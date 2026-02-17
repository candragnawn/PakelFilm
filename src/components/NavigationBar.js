import { Navbar, Container, Nav, Form } from "react-bootstrap";

import { useState } from "react";
import { useEffect } from "react";

const NavigationBar = () => {
  const [query, setQuery] = useState("");
  const [search, searchResults] = useState([]);
  const IMG_URL = process.env.REACT_APP_BASEIMGURL;

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${value}`,
      );
      const data = await response.json();
      searchResults(data.results || []);
    } else {
      searchResults([]);
    }
  };

  return (
    <Navbar variant="dark" fixed="top" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/" className="fw-medium">
          PAKELFILMS
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#trending">HOME</Nav.Link>
          <Nav.Link href="#superhero">PROFILE</Nav.Link>
          <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
        </Nav>
        <Form className="d-flex align-items-center">
          <div className="search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <Form.Control
              type="search"
              placeholder="Search for movies or TV shows"
              onChange={handleSearch}
              className="search-input-modern"
            />
          </div>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
