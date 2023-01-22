import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getTranslation } from "../../locales/locales";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Accordion from "react-bootstrap/Accordion";

const test_categories = [
  { id: "item-id", name: "Item ID" },
  { id: "publish-date", name: "Publish date" },
  { id: "read-date", name: "Read date" },
  { id: "source", name: "Source" },
  { id: "tags", name: "Tag" },
  { id: "notes", name: "Notes" }
];


export default function FilterForm() {
  const { locale } = useContext(GlobalContext);
  const activeLocale = locale.activeLocale;
  const localeCategory = "forms.filter-form.";

  const renderCategories = (categories) => {
    return categories.map((category) => {
      return (
        <Form.Group
          key={category.id}
          as={Row}
        >
          <Form.Label 
            column
            sm="2"
          >
            <b>{category.name}:</b>
          </Form.Label>
          <Col sm="10">
            <Form.Control />
          </Col>
        </Form.Group>
      );
    });
  };

  return (
    <Form>
      <Accordion.Item>
        <Accordion.Header><h2>{getTranslation(activeLocale, localeCategory + "caption")}</h2></Accordion.Header>
        <Accordion.Body>
          {renderCategories(test_categories)}
          <Row className="align-items-center">
            <Col><Button className="me-auto">{getTranslation(activeLocale, localeCategory + "apply")}</Button></Col>
            <Col><Button>{getTranslation(activeLocale, localeCategory + "clear")}</Button></Col>
            <Col><Button>{getTranslation(activeLocale, localeCategory + "save")}</Button></Col>
          </Row>
          <br />
          {getTranslation(activeLocale, localeCategory + "applied-filters")}:
          <br />
          (x {getTranslation(activeLocale, localeCategory + "applied")})
        </Accordion.Body>
      </Accordion.Item>
    </Form>
  );
}
