import { Button } from "react-bootstrap/Button";
import { Form } from "react-bootstrap/Form";

const searchBar = () => {
  return (
    <Form inline>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default searchBar;
