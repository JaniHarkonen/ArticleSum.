import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../../components/ArticleListing/ArticleListing";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import useFormModal from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import ArticleFilterForm from "../../components/ArticleFilterForm/ArticleFilterForm";


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const { popup } = useFormModal();
  const [articles, setArticles] = useState(wm.getArticleContainer().filterItems());

  const renderArticleListings = () => {
    return articles.map((item) => {
      return (
        <ArticleListing
          key={"list-view-article-listing" + item.id}
          eventKey={"" + item.id}
          articleTitle={item.title}
          articleSource={item.source}
          actions={{
            onEdit: () => popup(createArticlePopup(item))
          }}
        />
      );
    });
  };

  return (
    <>
      <Accordion defaultActiveKey="-1">
        <ArticleFilterForm filterArticles={setArticles} />
      </Accordion>
      <ArticleControlPanel />
      <br />
      <h2>{lm.translate("list-view.listings-caption")}</h2>
      <Accordion defaultActiveKey="-1">
        {renderArticleListings()}
      </Accordion>
    </>
  );
}
