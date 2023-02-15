import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { GlobalContext } from "../../context/GlobalContext";


export default function ArticleListing(props) {
  const eventKey = props.eventKey;
  const articleTitle = props.articleTitle;
  const articleSource = props.articleSource;
  const actions = props.actions;
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{articleTitle}</Accordion.Header>
      <Accordion.Body>
        {articleSource}
        <Button onClick={() => actions.onEdit()}>
          {lm.translate("list-view.listing.open")}
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}
