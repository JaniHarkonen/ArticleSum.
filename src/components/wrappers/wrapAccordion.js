import Accordion from "react-bootstrap/Accordion";

/**
 * Simple wrapper that wraps its children under a Bootstrap 
 * `Accordion`. 
 */
export default function wrapAccordion(children) {
  return (
    <Accordion defaultActiveKey="-1">
      {children}
    </Accordion>
  );
}
