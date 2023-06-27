import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";


export default function FilterForm(props) {
  const children = props.children;
  const controlActions = props.actions;

  const { languageManager: lm } = useContext(GlobalContext);
  const localeCategory = "forms.filter-form.";

  return (
    <Form>
      <Accordion.Item>
        <Accordion.Header><h2>{lm.translate(localeCategory + "caption")}</h2></Accordion.Header>
        <Accordion.Body>
          {children}
          <Row className="mt-3">
            <Col />
            <Col className="m-0">
              <Row>
                <Col>
                  <Button
                    className="w-100"
                    variant="secondary"
                    onClick={() => controlActions.clear()}
                  >
                    {lm.translate(localeCategory + "clear")}
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="w-100"
                    onClick={() => controlActions.apply()}
                  >
                    {lm.translate(localeCategory + "apply")}
                  </Button>
                </Col>
              </Row>
            </Col>
            {/*<Col><Button>{lm.translate(localeCategory + "save")}</Button></Col>*/}
          </Row>
          {/*{lm.translate(localeCategory + "applied-filters")}:
          <br />
  (x {lm.translate(localeCategory + "applied")})*/}
        </Accordion.Body>
      </Accordion.Item>
    </Form>
  );
}
