import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";

const Genre = () => {
  return (
    <div className="d-flex horizontal-scroll-wrapper">
      <Container>
        <Nav className="me-auto genre">
          <Nav.Link href="#home" className="genre-text">
            Home
          </Nav.Link>
          <Nav.Link href="#link" className="genre-text">
            Link
          </Nav.Link>
          <Nav.Link href="#link" className="genre-text">
            Link
          </Nav.Link>
          <Nav.Link href="#link" className="genre-text">
            Link
          </Nav.Link>
          <Nav.Link href="#link" className="genre-text">
            Link
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
};

export default Genre;
