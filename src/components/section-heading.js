import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SectionHeading = () => {
  return (
    <Container className="section-heading">
      <Row>
        <Col>
          <h5>judul</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              height: "300px",
              width: "450px",
              background: "#333",
              borderRadius: "8px",
            }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
};

export default SectionHeading;
