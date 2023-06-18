import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useContext, useState } from "react";

import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";
import ArticleDataSortControls from "../../components/ArticleDateSortControls/ArticleDataSortControls";
import ArticleList from "../../components/ArticleList/ArticleList";
import SelectableElement from "../../components/SelectableElement/SelectableElement";

import { GlobalContext } from "../../context/GlobalContext";
import wrapAccordion from "../../components/wrappers/wrapAccordion";
import useSelectables from "../../hooks/form/useSelectables";
import createButtons from "../../utils/createButtons";

export const DEFAULT_SETTINGS = {
  articleList: {
    pageCapacity: 25
  }
};


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const [articles, setArticles] = useState(wm.getArticleContainer().filterItems());
  const {
    selection: selectedArticles,
    getSelectionIds,
    handleSelect,
    handleSelectAll,
    handleDeselectAll

  } = useSelectables({ items: articles, idField: "id" });


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
