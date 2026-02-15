import { Col, Container, Row, Button } from "react-bootstrap";

const Intro = () => {
  return (
    <div className="intro align-items-start text-white">
      <Container>
        <Row>
          <Col>
            <p className="caption">NONTON FILM</p>
            <h1 className="title">Nonton</h1>
            <p className="caption mb-2">GAK PAKE KARCIS</p>

            <div className="introButton mt-4 ">
              <Row>
                <Col className=" d-flex gap-3">
                  <Button variant="dark p-3 rounded-lg">Play</Button>

                  <Button variant="dark">Lihat Semua List</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
