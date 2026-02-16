import {
  Navbar,
  Container,
  Nav,
  Form,
} from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar variant="dark" fixed="top" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/" className="fw-medium">PAKELFILMS</Navbar.Brand>
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
              className="search-input-modern"
            />
          </div>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
