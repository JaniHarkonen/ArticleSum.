import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import { compareDateStrings } from "../../utils/sortComparisons";


export default function useSortedArticles(props) {
  const filterCriteria = props.filterCriteria;
  const initialSort = props.initialSort || function() { return false; }
  
  const {workspaceManager: wm} = useContext(GlobalContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const filteredArticles = wm.getArticleContainer().filterItems(filterCriteria);
    
    if( initialSort )
    setArticles(filteredArticles.sort(initialSort));
    else
    setArticles(filteredArticles);

  }, []);
  
  const sort = (sortBy) => setArticles(articles.sort(sortBy));
  const sortByReadDate = () => sort((a1, a2) => compareDateStrings(a1.readDate, a2.readDate));
  const sortByPublishDate = () => sort((a1, a2) => compareDateStrings(a1.publishDate, a2.publishDate));

  return {
    articles,
    sort,
    sortByReadDate,
    sortByPublishDate
  };
}