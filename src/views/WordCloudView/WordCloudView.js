import { useContext, useState } from "react";

import WordCloud from "../../components/WordCloud/WordCloud";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import WordFilterForm from "../../components/WordFilterForm/WordFilterForm";
import { GlobalContext } from "../../context/GlobalContext";
import { FILTER_TYPES } from "../../components/WordFilterForm/WordFilterForm";
import wrapAccordion from "../../components/wrappers/wrapAccordion";
import { getYearFromDatetimeString } from "../../utils/dates";


export default function WordCloudView() {
  const {workspaceManager: wm} = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();

  const [articles, setArticles] = useState(articleContainer.filterItems());
  const [wordFilter, setWordFilter] = useState({ filterType: FILTER_TYPES.FILTER_MATCHING, filteredWords: [] });
  const [targetYear, setTargetYear] = useState("" + (new Date()).getFullYear());


  const generateWordInventory = () => {
    const inventory = []; // Eventual inventory of the word cloud
    const inventoryEntries = {};  // Indices of inventory items coupled with their words

    for( let article of articles )
    {
        // Only include the articles of the target year
      if( !targetYear || getYearFromDatetimeString(article["publish-date"]) !== targetYear )
      continue;

      const articleWords = article.notes.split(" ");

      for( let word of articleWords )
      {
          // If the word exists -> find it in the inventory, increment 
          // occurrence counter
        if( inventoryEntries[word] !== undefined )
        inventory[inventoryEntries[word]].occurrences += 1;
        else
        {
            // Otherwise, place the item into inventory, store the 
            // index
          inventoryEntries[word] = inventory.length;
          inventory.push({
            word: word,
            occurrences: 1
          });
        }
      }
    }

    return inventory;
  };

  const applyInventoryFilter = (inventory) => {
    if( wordFilter.filteredWords.length < 1 )
    return inventory;

    switch( wordFilter.filterType )
    {
      case FILTER_TYPES.FILTER_MATCHING: return inventory.filter((item) => !wordFilter.filteredWords.includes(item.word));
      case FILTER_TYPES.INCLUDE_MATCHING: return inventory.filter((item) => wordFilter.filteredWords.includes(item.word));
    }
  };

  return (
    <>
      {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      <WordFilterForm onSubmit={(filter) => setWordFilter(filter)} />
      <WordCloud
        inventory={applyInventoryFilter(generateWordInventory())}
        minFontSize={12}
        maxFontSize={30}
        messageEmpty={"No words found for year " + targetYear}
      />
      <input
        type="number"
        value={parseInt(targetYear)}
        onChange={(e) => setTargetYear(e.target.value)}
      />
    </>
  );
}
