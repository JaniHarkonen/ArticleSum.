import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import { Styles } from "./ArticleListing.styles";
import ASSETS from "../../assets/assets";
import openLinkUsingHTTPS from "../../utils/openLinkUsingHTTPS";


/**
 * An article listing component used mostly by the `ArticleList`. Functions 
 * essentially as a specified Bootstrap Accordion.Item. This listing 
 * will display the title of the article and, when expanded, the 
 * source link as well as a button that can be used to run an `onEdit`-
 * function found inside the `actions`-prop (usually, opens the article 
 * in a popup modal).
 * 
 * A warning can also be provided, which is then displayed as a red exclamation
 * triangle next to the title of the article (the warning can be read by hovering
 * the mouse over the triangle).
 */
export default function ArticleListing(props) {
  const eventKey = props.eventKey;

  /**
   * Title of the article that the listing represents.
   */
  const articleTitle = props.articleTitle;

  /**
   * Source link for the article that the listing represents.
   */
  const articleSource = props.articleSource;

  /**
   * A warning that is to be displayed on the left side of the title of the 
   * article upon hovering mouse over it (exclamation triangle).
   */
  const warning = props.warning;

  /**
   * The action functions that can be triggered by the user 
   * upon clicking. So far, should only include the `onEdit`-function 
   * which is called upon clicking "open".
   */
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
        <Button
          className="me-2"
          onClick={() => actions.onEdit()}
        >
          {lm.translate("list-view.listing.open")}
        </Button>
        <Styles.ArticleSourceSpan onClick={() => openLinkUsingHTTPS(articleSource)}>
          {articleSource}
        </Styles.ArticleSourceSpan>
      </Accordion.Body>
    </Accordion.Item>
  );
}
