import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

/**
 * Provides a generic form for filters. The actual filter input fields
 * themselves are to be passed onto this component as its `children`.
 * 
 * This component renders the caption and the filteration controls. 
 * All the elements are wrapped inside a Bootstrap `Form`- and 
 * `Accordion.Item`-components. This is because the filter form is 
 * typically contained in an expandable Bootstrap `Accordion`-component.
 * 
 * The filter form also takes in `actions` which provide the `apply`-
 * and `clear`-hooks that are triggered as the user clicks on their 
 * respective buttons.
 */
export default function FilterForm(props) {
  /**
   * The elements that constitute the actual body of the form.
   */
  const children = props.children;

  /**
   * Contains the functions that will be executed by the user input.
   * Following functions are to be included:
   * - `apply` which is triggered when the user applies the filters
   * - `clear` which is triggered when the user clears the filters
   */
  const controlActions = props.actions;

  /**
   * Translation key prefix used by the UI-elements of this component.
   */
  const localeCategory = "forms.filter-form.";

  const { languageManager: lm } = useContext(GlobalContext);

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
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Form>
  );
}
