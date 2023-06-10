import Accordion from "react-bootstrap/Accordion";


export default function wrapAccordion(children) {
  return (
    <Accordion defaultActiveKey="-1">
      {children}
    </Accordion>
  );
}
