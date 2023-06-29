/**
 * This utility module should be used to declare tabs of the ArticleSum.
 * application. Each tab must have an ID which is used to retrieve the 
 * translation for the title of the tab. A tab must also have a reference 
 * to the function that will be used to instantiate the React-component 
 * (i.e. the major component of the view itself).
 */

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
