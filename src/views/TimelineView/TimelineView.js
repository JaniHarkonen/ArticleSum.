import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Timeline from "./components/Timeline";
import Accordion from "react-bootstrap/Accordion";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import createEnum from "../../utils/createEnum";
import Dropdown from "react-bootstrap/Dropdown";
import GotoPanel from "./components/GotoPanel/GotoPanel";

const DISPLAY_CRITERIAS = createEnum([
  "publishDate",
  "readDate"
]);


export default function TimelineView() {
  const {workspaceManager: wm} = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();
  const [articles, setArticles] = useState(articleContainer.filterItems());
  const [displayCriteria, setDisplayCriteria] = useState(DISPLAY_CRITERIAS.publishDate);
  const [timelineOriginDate, setTimelineOriginDate] = useState(new Date());

  return (
    <>
      <Accordion defaultActiveKey="-1">
        <ArticleFilterForm filterArticles={setArticles} />
      </Accordion>
      <Dropdown onSelect={(criteriaKey) => setDisplayCriteria(criteriaKey)}>
        <Dropdown.Toggle>{"Sort by: " + displayCriteria}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={DISPLAY_CRITERIAS.publishDate}>{"Publish date"}</Dropdown.Item>
          <Dropdown.Item eventKey={DISPLAY_CRITERIAS.readDate}>{"Read date"}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <GotoPanel
        value={timelineOriginDate}
        onGoto={setTimelineOriginDate}
      />
      <Timeline
        origin={timelineOriginDate}
        articles={articles}
      />
    </>
  );
}
