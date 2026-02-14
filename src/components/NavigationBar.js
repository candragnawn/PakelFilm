import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavigationBar = () => {
  return (
    <div>
      <Navbar variant="dark">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="/">PAKELFILMS</Navbar.Brand>
          <Nav>
            <Nav.Link href="#trending">TRENDING</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
          </Nav>
        </Container>
        <Form className="m-3">
          <Row>
            <Col>
              <Form.Control
                type="input"
                placeholder="search.."
                className="bg-transparent rounded rounded-8 p-2"
                style={{ width: "300px" }}
              />
            </Col>
            <Col>
              <Button
                variant="light"
                onClick={() => console.log("search")}
                className="px-4 "
              >
                search
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
