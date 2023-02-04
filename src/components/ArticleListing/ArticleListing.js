import Accordion from "react-bootstrap/Accordion";


export default function ArticleListing(props) {
  const article = props.article;
  const eventKey = props.eventKey;
  const articleTitle = article.title;
  const articleSource = article.source;

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{articleTitle}</Accordion.Header>
      <Accordion.Body>{articleSource}</Accordion.Body>
    </Accordion.Item>
  );
}
