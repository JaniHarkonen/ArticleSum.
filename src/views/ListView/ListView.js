import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import ArticleDataSortControls from "../../components/ArticleDateSortControls/ArticleDataSortControls";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import SelectableElement from "../../components/SelectableElement/SelectableElement";


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();
  const [articles, setArticles] = useState(wm.getArticleContainer().filterItems());
  const [selectedArticles, setSelectedArticles] = useState({});


  const handleSelect = (articleId, isSelected) => {
    setSelectedArticles({
      ...selectedArticles,
      [articleId]: isSelected
    });
  };

  const handleSelectAll = () => {
    const newSelectedArticles = {};

    for( let article of articles )
    newSelectedArticles[article.id] = true;

    setSelectedArticles(newSelectedArticles);
  };

  const handleDeselectAll = () => {
    setSelectedArticles({});
  };

  const handleDelete = () => {
    if( Object.keys(selectedArticles).length > 0 )
    articleContainer.removeMany((article) => selectedArticles[article.id]);
  };

  const ListingSelectionWrapper = (Listing, article) => {
    const articleId = article.id;

    return (
      <SelectableElement
        checked={selectedArticles[articleId]}
        onChange={(isSelected) => handleSelect(articleId, isSelected)}
      >
        {Listing}
      </SelectableElement>
    );
  };

  return (
    <>
      <Accordion defaultActiveKey="-1">
        <ArticleFilterForm filterArticles={setArticles} />
      </Accordion>
      <ArticleControlPanel />
      <br />
      <h2>{lm.translate("list-view.listings-caption")}</h2>
      <ArticleDataSortControls
        articles={articles}
        setArticles={setArticles}
      />
      <Button onClick={handleSelectAll}>{"select all"}</Button>
      <Button onClick={handleDeselectAll}>{"de-select all"}</Button>
      <Button onClick={handleDelete}>{"delete"}</Button>
      <ArticleList
        defaultActiveKey="-1"
        articles={articles}
        pageSettings={{
          allowPages: true,
          pageCapacity: 100
        }}
        ListingWrapper={ListingSelectionWrapper}
      />
    </>
  );
}
