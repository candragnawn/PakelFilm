import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

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
    <Navbar variant="dark" fixed="top" className="navbar-custom pb-2 pb-lg-3" expand="lg">
      <Container className="flex-column flex-lg-row align-items-stretch align-items-lg-center">
        <div className="d-flex justify-content-between align-items-center w-100 w-lg-auto mb-2 mb-lg-0">
          <Navbar.Brand href="/" className="fw-medium m-0">
            PAKELFILMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 px-0" />
        </div>
        
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0 order-3 order-lg-2">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" className={isActive("/") ? "active-nav-link" : ""}>HOME</Nav.Link>
            <Nav.Link as={Link} to="/all" className={isActive("/all") ? "active-nav-link" : ""}>ALL</Nav.Link>
            <Nav.Link as={Link} to="/movie" className={isActive("/movie") ? "active-nav-link" : ""}>MOVIE</Nav.Link>
            <Nav.Link as={Link} to="/tv" className={isActive("/tv") ? "active-nav-link" : ""}>TV SHOWS</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Form className="d-flex w-100 w-lg-auto ms-lg-auto order-2 order-lg-3 mt-1 mt-lg-0">
          <div className="search-wrapper w-100">
            <i className="bi bi-search search-icon"></i>
            <Form.Control
              type="search"
              placeholder="Search..."
              value={query}
              onChange={handleSearch}
              className="search-input-modern w-100 bg-dark border-0 text-white placeholder-gray"
            />
          </div>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
