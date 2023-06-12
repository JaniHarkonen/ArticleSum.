import { useContext, useState } from "react";

import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import GotoPanel from "./components/GotoPanel/GotoPanel";
import IntervalPicker, { DATE_INTERVAL_TYPES } from "../../components/IntervalPicker/IntervalPicker";
import Timeline from "./components/Timeline";
import ArticleSortControls, { ARTICLE_SORT_CRITERIAS } from "../../components/ArticleSortControls/ArticleSortControls";
import { GlobalContext } from "../../context/GlobalContext";
import wrapAccordion from "../../components/wrappers/wrapAccordion";


export default function TimelineView() {
  const { workspaceManager: wm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();
  const [articles, setArticles] = useState(articleContainer.filterItems());
  const [displayCriteria, setDisplayCriteria] = useState(ARTICLE_SORT_CRITERIAS["publish-date"]);
  const [timelineOriginDate, setTimelineOriginDate] = useState(new Date());
  const [dateInterval, setDateInterval] = useState(DATE_INTERVAL_TYPES.year);

  return (
    <>
      {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      <ArticleSortControls onSelect={setDisplayCriteria} />
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
          dateInterval={dateInterval}
        />
      </div>
    </>
  );
}
