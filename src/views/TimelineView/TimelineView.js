import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Accordion from "react-bootstrap/Accordion";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import Dropdown from "react-bootstrap/Dropdown";
import GotoPanel from "./components/GotoPanel/GotoPanel";
import IntervalPicker, { DATE_INTERVAL_TYPES } from "../../components/IntervalPicker/IntervalPicker";
import Timeline from "./components/Timeline";

const DISPLAY_CRITERIAS = {
  publishDate: "publish-date",
  readDate: "read-date"
};


export default function TimelineView() {
  const {workspaceManager: wm} = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();
  const [articles, setArticles] = useState(articleContainer.filterItems());
  const [displayCriteria, setDisplayCriteria] = useState(DISPLAY_CRITERIAS.publishDate);
  const [timelineOriginDate, setTimelineOriginDate] = useState(new Date());
  const [dateInterval, setDateInterval] = useState(DATE_INTERVAL_TYPES.year);

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
      <IntervalPicker onChange={setDateInterval} />
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Timeline
          origin={timelineOriginDate}
          articles={articles}
          dateField={displayCriteria}
        />
      </div>
    </>
  );
}
