import Row from "react-bootstrap/Row";

import { useContext, useLayoutEffect, useState } from "react";

import WordCloud from "../../components/WordCloud/WordCloud";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import WordFilterForm from "../../components/WordFilterForm/WordFilterForm";

import { GlobalContext } from "../../context/GlobalContext";
import { FILTER_TYPES } from "../../components/WordFilterForm/WordFilterForm";
import { getYearFromDatetimeString } from "../../utils/dates";
import wrapAccordion from "../../components/wrappers/wrapAccordion";

export const DEFAULT_SETTINGS = {
  wordFilter: null
};

/**
 * Major view component that provides the application with a word 
 * cloud that can be used to visualize the notes of a given year.
 * 
 * In this view, the user can select the year for which the word 
 * cloud is to be generated. A quick filter can be used to filter 
 * out or only allow certain words to be represented by the cloud.
 */
export default function WordCloudView() {
  const { workspaceManager: wm, languageManager: lm } = useContext(GlobalContext);

  /**
   * Reference to the article container of the `WorkspaceManager`.
   */
  const articleContainer = wm.getArticleContainer();

  const [articles, setArticles] = useState([]);
  const [wordFilter, setWordFilter] = useState(DEFAULT_SETTINGS.wordFilter);
  const [targetYear, setTargetYear] = useState("" + (new Date()).getFullYear());

  useLayoutEffect(() => {
    setArticles(articleContainer.filterItems());
  }, [articleContainer]);

  /**
   * Generates the word inventory for the `WordCloud`-component.
   * The inventory consists of JSONs containing the word as well
   * as the number of occurrences in the notes.
   * 
   * @returns Array containing the inventory of words accepted by
   * the `WordCloud`.
   */
  const generateWordInventory = () => {
    const inventory = []; // Eventual inventory of the word cloud
    const inventoryEntries = {};  // Indices of inventory items coupled with their words
    const reDisgardedPunctuation = /\.|,|:|;|-|'|"|_|\*|\+|\?/g; // These characters must be excluded to avoid double-takes

    for( let article of articles )
    {
        // Only include the articles of the target year
      if( !targetYear || getYearFromDatetimeString(article["publish-date"]) !== targetYear )
      continue;

      const articleWords = article.notes.replaceAll(reDisgardedPunctuation, "").split(" ");

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

  /**
   * Applies the quick filter to the inventory of words as provided
   * by the `WordFilterForm`-component.
   * 
   * @param {Array} inventory Word inventory that is to be filtered
   * according to the quick filter.
   * 
   * @returns A new array representing the filtered word inventory.
   */
  const applyInventoryFilter = (inventory) => {
    if( !wordFilter )
    return inventory;

    if( wordFilter.filteredWords.length < 1 )
    return inventory;

    switch( wordFilter.filterType )
    {
      case FILTER_TYPES.FILTER_MATCHING: return inventory.filter((item) => !wordFilter.filteredWords.includes(item.word));
      case FILTER_TYPES.INCLUDE_MATCHING: return inventory.filter((item) => wordFilter.filteredWords.includes(item.word));
      default: return inventory;
    }
  };

  return (
    <>
      <Row>
        {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      </Row>
      <Row
        className="mt-3"
        sm="2"
      >
        <WordFilterForm
          defaultFilter={wordFilter}
          onSubmit={(filter) => setWordFilter(filter)}
        />
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <div className="position-relative w-auto">
          <b className="me-2">{lm.translate("date.year")}: </b>
          <input
            type="number"
            value={parseInt(targetYear)}
            onChange={(e) => setTargetYear(e.target.value)}
            style={{
              width: "50%"
            }}
          />
        </div>
      </Row>
      <Row className="mt-3">
        <WordCloud
          inventory={applyInventoryFilter(generateWordInventory())}
          minFontSize={12}
          maxFontSize={30}
          messageEmpty={lm.translate("word-cloud-view.cloud-empty-message") + " " + targetYear}
        />
      </Row>
    </>
  );
}
