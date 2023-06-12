import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import ArticleDataSortControls from "../../components/ArticleDateSortControls/ArticleDataSortControls";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import SelectableElement from "../../components/SelectableElement/SelectableElement";
import wrapAccordion from "../../components/wrappers/wrapAccordion";
import useSelectables from "../../hooks/form/useSelectables";


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();
  const [articles, setArticles] = useState(wm.getArticleContainer().filterItems());
  const {
    selection: selectedArticles,
    getSelectionIds,
    handleSelect,
    handleSelectAll,
    handleDeselectAll

  } = useSelectables({ items: articles, idField: "id" });


  const handleDelete = () => {
    if( getSelectionIds().length > 0 )
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

  console.log(articles);

  return (
    <>
      {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      <ArticleControlPanel />
      <br />
      <h2>{lm.translate("list-view.listings-caption")}</h2>
      <ArticleDataSortControls
        articles={articles}
        setArticles={setArticles}
      />
      <Button onClick={handleSelectAll}>{lm.translate("selection-controls.select")}</Button>
      <Button onClick={handleDeselectAll}>{lm.translate("selection-controls.deselect")}</Button>
      <Button onClick={handleDelete}>{lm.translate("selection-controls.delete")}</Button>
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
