import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import { Styles } from "./ArticleListing.styles";
import ASSETS from "../../assets/assets";


export default function ArticleListing(props) {
  const eventKey = props.eventKey;
  const articleTitle = props.articleTitle;
  const articleSource = props.articleSource;
  const warning = props.warning;
  const actions = props.actions;

  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Accordion.Item
      className="mt-1"
      eventKey={eventKey}
    >
      <Accordion.Header>
        {
          warning &&
          <Styles.WarningIcon
            role="img"
            className="me-2 glyphicon text-success"
            title={warning}
            src={ASSETS.black.icon.exclamationTriangle}
          />
        }
        {articleTitle}
      </Accordion.Header>
      <Accordion.Body>
        {articleSource}
        <Button
          className="ms-2"
          onClick={() => actions.onEdit()}
        >
          {lm.translate("list-view.listing.open")}
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}
