import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Timeline from "./components/Timeline";


export default function TimelineView() {
  const { workspaceManager: wm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();

  return (
    <Timeline
      origin="1/1/2000"
      articles={articleContainer.filterItems()}
    />
  );
}
