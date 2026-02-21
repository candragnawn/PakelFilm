import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }

    window.searchTimeout = setTimeout(() => {
      if (value.length > 2) {
        navigate(`/?q=${encodeURIComponent(value)}`);
      } else {
        navigate(`/`);
      }
    }, 500);
  };

  return (
    <Navbar variant="dark" fixed="top" className="navbar-custom" bg="transparent">
      <Container>
        <Navbar.Brand href="/" className="fw-medium">
          PAKELFILMS
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">HOME</Nav.Link>
          <Nav.Link href="/movie">MOVIE</Nav.Link>
          <Nav.Link href="/tv-shows">TV SHOWS</Nav.Link>
        </Nav>
        <Form className="d-flex align-items-center">
          <div className="search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <Form.Control
              type="search"
              placeholder="Search for movies or TV shows"
              value={query}
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
