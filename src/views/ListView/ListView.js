import FilterForm from "../../forms/FilterForm/FilterForm";
import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../../components/ArticleListing/ArticleListing";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import ArticleControlPanel from "../../components/ArticleControlPanel/ArticleControlPanel";
import useFormModal from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const { popup } = useFormModal();

  const renderArticleListings = () => {
    return wm.getArticleContainer().mapItems((item) => {
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
        <FilterForm>
          <ArticleFilters />
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
