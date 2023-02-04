import FilterForm from "../../forms/FilterForm/FilterForm";
import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../../components/ArticleListing/ArticleListing";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import { mapElements } from "../../utils/mapElements";

const test_article = {
  articleId: 1,
  articleTitle: "FINNAIR DID 9/11 - stock soars 911%",
  articleSource: "www.pornhub.com",
  publishDate: "11/09/2001",
  readDate: "12/12/2012",
  tags: [],
  notes: "hmm, what an interesting article\n->indeed, indubitably it was\nchange my mind"
};


export default function ListView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);

  const renderArticleListings = () => {
    return wm.getArticleContainer().mapItems((item) => {
      return (
        <ArticleListing
          key={"list-view-article-listing" + item.id}
          eventKey={"" + item.id}
          article={item}
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
      <br />
      <h2>{lm.translate("list-view.listings-caption")}</h2>
      <Accordion defaultActiveKey="-1">
        {renderArticleListings()}
      </Accordion>
    </div>
  );
}
