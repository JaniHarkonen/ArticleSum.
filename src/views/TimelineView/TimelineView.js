import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useContext, useLayoutEffect, useState } from "react";

import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import GotoPanel from "./components/GotoPanel/GotoPanel";
import IntervalPicker, { DATE_INTERVAL_TYPES } from "../../components/IntervalPicker/IntervalPicker";
import Timeline from "./components/Timeline";
import ArticleSortControls, { ARTICLE_SORT_CRITERIAS } from "../../components/ArticleSortControls/ArticleSortControls";

import { GlobalContext } from "../../context/GlobalContext";
import wrapAccordion from "../../components/wrappers/wrapAccordion";

/**
 * Major view component that renders a timeline view where the 
 * articles of the workspace are displayed in the chronological 
 * order either by their publish date or by read date.
 * 
 * The user can pan the timeline using the left mouse button to
 * scroll forwards or backwards in time. The articles will be 
 * placed into containers know as "date slots" according to the 
 * desired interval. By default, the articles are sorted by year
 * meaning each date slot contains the articles for a specific 
 * year. The articles can also be arranged by day or by month.
 * 
 * The timeline can be ordered by ther publish date or the read
 * date of the article. The user can also go to a specific date 
 * in the timeline by inputting the date inside the date picker 
 * found in the top-left corner of the view.
 */
export default function TimelineView() {
  const { workspaceManager: wm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();

  const [articles, setArticles] = useState([]);
  const [displayCriteria, setDisplayCriteria] = useState(ARTICLE_SORT_CRITERIAS["publish-date"]);
  const [timelineOriginDate, setTimelineOriginDate] = useState(new Date());
  const [dateInterval, setDateInterval] = useState(DATE_INTERVAL_TYPES.year);

  useLayoutEffect(() => {
    setArticles(articleContainer.filterItems());
  }, [articleContainer]);

  return (
    <>
      <Row>
        {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      </Row>
      <Row className="mt-2">
        <Col>
          <GotoPanel
            value={timelineOriginDate}
            onGoto={setTimelineOriginDate}
          />
        </Col>
        <Col />
      </Row>
      <Row className="mb-2">
        <Col className="mt-1">
          <IntervalPicker
            value={dateInterval}
            onChange={setDateInterval}
          />
        </Col>
        <Col className="d-flex justify-content-end align-items-end mt-1">
          <ArticleSortControls onSelect={setDisplayCriteria} />
        </Col>
      </Row>
      <Row>
        <div
          style={{
            position: "relative",
            height: "400px"
          }}
        >
          <Timeline
            origin={timelineOriginDate}
            articles={articles}
            dateField={displayCriteria}
            dateInterval={dateInterval}
          />
        </div>
      </Row>
    </>
  );
}
