import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useContext, useState } from "react";

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


export default function WordCloudView() {
  const { workspaceManager: wm, languageManager: lm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();

  const [articles, setArticles] = useState(articleContainer.filterItems());
  const [wordFilter, setWordFilter] = useState(DEFAULT_SETTINGS.wordFilter);
  const [targetYear, setTargetYear] = useState("" + (new Date()).getFullYear());

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
