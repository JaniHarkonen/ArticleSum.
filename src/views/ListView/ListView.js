import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useContext, useLayoutEffect, useState } from "react";

import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import ArticleDataSortControls from "../../components/ArticleDateSortControls/ArticleDataSortControls";
import ArticleList from "../../components/ArticleList/ArticleList";
import SelectableElement from "../../components/SelectableElement/SelectableElement";

import { GlobalContext } from "../../context/GlobalContext";
import wrapAccordion from "../../components/wrappers/wrapAccordion";
import useSelectables from "../../hooks/form/useSelectables";
import createButtons from "../../utils/createButtons";
import useRefresh from "../../hooks/useRefresh";

export const DEFAULT_SETTINGS = {
  articleList: {
    pageCapacity: 15
  }
};

/**
 * Major view component that renders the article inventory 
 * used by the workspace.
 * 
 * The user can sort article according to either their publish
 * date or by their read date. The articles can be selected 
 * individually or by using the control buttons on the left side
 * of the view. Selected articles can be deleted via the "delete"-
 * button or new ones can be created via the "add"-button.
 * 
 * The articles will be arranged in a list in the order determined 
 * by their sorting settings. This component declares the listing 
 * wrapper that will be used by the `ArticleList`-component to 
 * create the selection checkboxes for articles.
 */
export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const articleContainer = wm.getArticleContainer();
  const [articles, setArticles] = useState([]);
  const {
    selection: selectedArticles,
    getSelectionIds,
    handleSelect,
    handleSelectAll,
    handleDeselectAll

  } = useSelectables({ items: articles, idField: "id" });
  
  const { refreshValue, refresh } = useRefresh();

  useLayoutEffect(() => {
    wm.getArticleContainer().addModificationListener("list-view", () => refresh());
    setArticles(wm.getArticleContainer().filterItems());

    return () => wm.getArticleContainer().removeModificationListener("list-view");
  }, [articleContainer, refreshValue]);

  /**
   * `ArticleList`-wrapper element that will be placed around 
   * the article listings. This wrapper provides the selection
   * check box that can be found on the left side of the 
   * article listing.
   * 
   * @param {JSX} Listing The JSX-element of the article listing
   * that is to be wrapped.
   * @param {JSON} article The JSON of the article represented
   * by this article listing.
   * 
   * @returns An article list item wrapped inside `SelectableElement`-
   * component.
   */
  const ListingSelectionWrapper = (Listing, article) => {
    const articleId = article.id;

    return (
      <SelectableElement
        key={"list-view-selectable-article-" + articleId}
        checked={selectedArticles[articleId]}
        onChange={(isSelected) => handleSelect(articleId, isSelected)}
      >
        {Listing}
      </SelectableElement>
    );
  };

  return (
    <>
      <Row>
        {wrapAccordion(<ArticleFilterForm filterArticles={setArticles} />)}
      </Row>
      <Row>
        <Col lg="5" className="ms-2 me-2 mt-2">
          {createButtons([
            { className: "mt-1 me-1", onClick: handleSelectAll, caption: lm.translate("selection-controls.select") },
            { className: "mt-1 me-1", onClick: handleDeselectAll, caption: lm.translate("selection-controls.deselect") }
          ])}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="ms-2 me-2 mt-1 mb-1">
          <ArticleControlPanel selection={{
            articles: selectedArticles,
            getSelectionIds
          }} />
        </Col>
        <Col className="d-flex justify-content-end align-items-end mb-1 me-2">
          <ArticleDataSortControls
            articles={articles}
            setArticles={setArticles}
          />
        </Col>
      </Row>
      <Row>
        <ArticleList
          defaultActiveKey="-1"
          articles={articles}
          pageSettings={{
            allowPages: true,
            pageCapacity: DEFAULT_SETTINGS.articleList.pageCapacity
          }}
          ListingWrapper={ListingSelectionWrapper}
        />
      </Row>
    </>
  );
}
