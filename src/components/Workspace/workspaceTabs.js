import TimelineView from "../../views/TimelineView/TimelineView";
import WordCloudView from "../../views/WordCloudView/WordCloudView";
import ListView from "../../views/ListView/ListView";
import TagsView from "../../views/TagsView/TagsView";

const Tab = (id, jsx) => {
  return {
    id: id,
    jsx: jsx
  };
};

export const workspaceTabs = [
  Tab("timeline", TimelineView),
  Tab("word-cloud", WordCloudView),
  Tab("list", ListView),
  Tab("tags", TagsView)
];
