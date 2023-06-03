import { useContext, useState } from "react";

import WordCloud from "../../components/WordCloud/WordCloud";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import { GlobalContext } from "../../context/GlobalContext";
import wrapAccordion from "../../components/wrappers/wrapAccordion";


export default function WordCloudView() {
  const {workspaceManager: wm} = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();

  const [articles, setArticles] = useState(articleContainer.filterItems());




  const generateWordInventory = () => {
    //const articles = articleContainer.filterItems();

    const inventory = []; // Eventual inventory of the word cloud
    const inventoryEntries = {};  // Indices of inventory items coupled with their words

    for( let article of articles )
    {
      const articleWords = article.notes.split(" ");

      for( let word of articleWords )
      {
          // If the word exists -> find it in the inventory, increment 
          // occurrence counter
        if( inventoryEntries[word] )
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

  return (
    <>
      {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      <WordCloud
        inventory={generateWordInventory()}
        minFontSize={12}
        maxFontSize={30}
      />
    </>
  );
}
