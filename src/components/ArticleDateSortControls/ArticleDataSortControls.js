import ArticleSortControls, { ARTICLE_SORT_CRITERIAS } from "../ArticleSortControls/ArticleSortControls";

import { compareDateStrings } from "../../utils/sortComparisons";

export const SORT_CRITERIAS = {
  publish: "publish",
  read: "read"
};


export default function ArticleDataSortControls(props) {
  const articles = props.articles;
  const setArticles = props.setArticles || function(ars) {};

  const handleCriteriaSelection = (criteriaKey) => {
    switch( criteriaKey )
    {
        // Sort by publish date
      case ARTICLE_SORT_CRITERIAS["publish-date"]:
        setArticles([...articles].sort((a1, a2) => compareDateStrings(a1["publish-date"], a2["publish-date"])));
        break;

        // Sort by read date
      case ARTICLE_SORT_CRITERIAS["read-date"]:
        setArticles([...articles].sort((a1, a2) => compareDateStrings(a1["read-date"], a2["read-date"]))); 
        break;
    }
  };

  return <ArticleSortControls onSelect={handleCriteriaSelection} />;
}