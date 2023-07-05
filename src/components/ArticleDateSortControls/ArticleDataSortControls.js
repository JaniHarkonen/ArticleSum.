import ArticleSortControls, { ARTICLE_SORT_CRITERIAS } from "../ArticleSortControls/ArticleSortControls";

import { compareDateStrings } from "../../utils/sortComparisons";

/**
 * Criterias according to which articles can be sorted date-wise.
 */
export const SORT_CRITERIAS = {
  publish: "publish",
  read: "read"
};

export const DEFAULT_SETTINGS = {
  setArticles: (articles) => {}
};

/**
 * Provides a basic article sorting panel consisting of a drop menu where
 * the user has the following functionalities:
 * - ordering of articles by publish date
 * - ordering of articles by reading date
 * The current ordering type is shown in the caption of the drop menu.
 * 
 * `sortComparisons`-utility methods are used to sort through the list of 
 * articles provided to this component.
 * 
 * **Notice :** as the articles are 
 * sorted they are assembled into a new array which is then "returned" to 
 * the parent component via the `setArticles`-hook. This may cause some 
 * issues with performance later with larger arrays, however, is necessary 
 * as of now due to the nature of React-states.
 */
export default function ArticleDataSortControls(props) {
  /**
   * Array of articles that the sort controls will affect (sort).
   */
  const articles = props.articles;

  /**
   * Hook that sets the articles provided by the parent component.
   */
  const setArticles = props.setArticles || DEFAULT_SETTINGS.setArticles;

  /**
   * Called upon changing the sorting criteria. Sorts the articles by the 
   * chosen sort criteria. The `criteriaKey` must be a valid one found in 
   * the `SORT_CRITERIAS`-JSON.
   * 
   * @param {String} criteriaKey `SORT_CRITERIAS`-key that determines the 
   * desired order of the articles.
   */
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