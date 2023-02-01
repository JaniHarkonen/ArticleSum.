import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Timeline from "./components/Timeline";

export default function TimelineView() {
  const { workspaceManager: wm } = useContext(GlobalContext);
  const articles = wm.getArticleContainer();

  return (
    <Timeline
      origin="1/1/2000"
      getArticles={articles.filterItems.bind(articles)}
    />
  );
}
