import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import useLanguageManager from "../../hooks/useLanguageManager";


export default function ArticleListing(props) {
  const eventKey = props.eventKey;
  const articleTitle = props.articleTitle;
  const articleSource = props.articleSource;
  const actions = props.actions;

  const LMButton = () => {
    return useLanguageManager({
      titleKey: "list-view.listing.open",
      Element: Button,
      props: {
        onClick: () => actions.onEdit()
      }
    });
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{articleTitle}</Accordion.Header>
      <Accordion.Body>
        {articleSource}
        <LMButton />
      </Accordion.Body>
    </Accordion.Item>
  );
}
