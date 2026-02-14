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
      <Navbar variant="dark" fixed="top">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="/">PAKELFILMS</Navbar.Brand>
          <Nav>
            <Nav.Link href="#trending">TRENDING</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
            <Nav.Link href="#superhero">SUPERHERO</Nav.Link>
          </Nav>
        </Container>
        <Form className="m-2">
          <Row>
            <Col>
              <Form.Control
                type="input"
                placeholder="search.."
                className=" search-input bg-transparent rounded-8 p-2 border-rounded"
                style={{ width: "300px" }}
              />
            </Col>
            <Col>
              <Button
                variant="dark"
                onClick={() => console.log("search")}
                className="px-4 rounded-8 "
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
