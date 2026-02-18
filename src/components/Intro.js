import { Col, Container, Row, Button } from "react-bootstrap";

const Intro = () => {
  
  
  
  return (
    <div className="intro align-items-center text-white">
      <Container>
        <Row>
          <Col md={6}>
            <div className="studio-logo mb-2">MARVEL STUDIOS</div>
            <h1 className="title-premium">Guardians of the Galaxy</h1>
            <div className="meta-info d-flex gap-3 my-3">
              <span>Action | Adventure | Sci-Fi</span>
              <span>2018</span>
              <span>2h 8m</span>
            </div>
            <p className="description-text mb-4">
              In a post-apocalyptic world where cities ride on wheels and consume each other to survive, 
              two people meet in London and try to stop a conspiracy.
            </p>
            <div className="d-flex gap-3">
              <Button className="btn-pill-red px-4 py-2" href="#trending">
                Explore Movies →
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
