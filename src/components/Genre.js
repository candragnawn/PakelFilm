import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";

const Genre = () => {
  return (
    <div className="d-flex  horizontal-scroll-wrapper">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Container>
    </div>
  );
};

export default Genre;
