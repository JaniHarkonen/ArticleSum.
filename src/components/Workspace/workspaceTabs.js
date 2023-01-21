import TimelineView from "../../views/TimelineView/TimelineView";
import WordInventoryView from "../../views/WordInventoryView/WordInventoryView";
import ListView from "../../views/ListView/ListView";
import TagsView from "../../views/TagsView/TagsView";


const Tab = (id, title, jsx) => {
  return {
    id: id,
    title: title,
    jsx: jsx
  };
};

export const workspaceTabs = [
  Tab("timeline", "Timeline", TimelineView),
  Tab("word-inv", "Word inventory", WordInventoryView),
  Tab("list", "List", ListView),
  Tab("tags", "Tags", TagsView),
];
