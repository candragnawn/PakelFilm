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
      <Navbar variant="dark" className="justify-content-between">
        <Container>
          <Navbar.Brand href="/">PAKELFILMS</Navbar.Brand>
          <Nav>
            <Nav.Link href="#trending">TRENDING</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
          </Nav>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  type="input"
                  placeholder="search.."
                  className="bg-transparent"
                />
              </Col>
              <Col>
                <Button variant="light" onClick={() => console.log("search")}>
                  search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
