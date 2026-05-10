import { Navbar, Container, Nav, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavigationBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar variant="dark" fixed="top" className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="fw-medium">
          PAKELFILMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={isActive("/") ? "active-nav-link" : ""}>HOME</Nav.Link>
            <Nav.Link as={Link} to="/all" className={isActive("/all") ? "active-nav-link" : ""}>ALL</Nav.Link>
            <Nav.Link as={Link} to="/movie" className={isActive("/movie") ? "active-nav-link" : ""}>MOVIE</Nav.Link>
            <Nav.Link as={Link} to="/tv" className={isActive("/tv") ? "active-nav-link" : ""}>TV SHOWS</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Form className="d-flex align-items-center">
              <div className="search-wrapper w-100">
                <i className="bi bi-search search-icon"></i>
                <Form.Control
                  type="search"
                  placeholder="Search for movies or TV shows"
                  value={query}
                  onChange={handleSearch}
                  className="search-input-modern w-100"
                />
              </div>
            </Form>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  className="nav-user-btn p-0"
                  id="user-dropdown"
                >
                  <div className="nav-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="nav-dropdown-menu">
                  <div className="nav-dropdown-header">
                    <strong>{user.name}</strong>
                    <small className="d-block text-secondary">{user.email}</small>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    className="nav-dropdown-item"
                  >
                    Profil Saya
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="nav-dropdown-item text-danger"
                  >
                    Keluar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="nav-login-btn">
                MASUK
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
