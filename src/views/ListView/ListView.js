import Accordion from "react-bootstrap/Accordion";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import ArticleDataSortControls from "../../components/ArticleDateSortControls/ArticleDataSortControls";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const [articles, setArticles] = useState(wm.getArticleContainer().filterItems());

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
      <ArticleList
        defaultActiveKey="-1"
        articles={articles}
        allowListingSelection
      />
    </>
  );
}
