import FilterForm from "../../forms/FilterForm/FilterForm";
import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../../components/ArticleListing/ArticleListing";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import useFormModal from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import useArticleFilterForm from "../../hooks/form/useArticleFilterForm";
import { Article } from "../../model/components/Article";
import { filterArticle } from "../../forms/FilterForm/filters";


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const { popup } = useFormModal();
  const { data, setters } = useArticleFilterForm(Article());
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
    <div>
      <Accordion defaultActiveKey="-1">
        <FilterForm
          actions={{
            apply: () => setArticles(wm.getArticleContainer().filterItems((article) => filterArticle(article, data))),

          }}
        >
          <ArticleFilters
            data={data}
            setters={setters}
          />
        </FilterForm>
      </Accordion>
      <ArticleControlPanel />
      <br />
      <h2>{lm.translate("list-view.listings-caption")}</h2>
      <Accordion defaultActiveKey="-1">
        {renderArticleListings()}
      </Accordion>
    </div>
  );
}
