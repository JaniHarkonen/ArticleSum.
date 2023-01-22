import FilterForm from "../../forms/FilterForm/FilterForm";
import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../../components/ArticleListing.js/ArticleListing";
import { getTranslation } from "../../locales/locales";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const test_article = {
  articleId: 1,
  articleTitle: "FINNAIR DID 9/11 - stock soars 911%",
  articleSource: "www.pornhub.com",
  publishDate: "11/09/2001",
  readDate: "12/12/2012",
  tags: [],
  notes: "hmm, what an interesting article\n->indeed, indubitably it was\nchange my mind"
};

const TEST_ARTICLES = [
  test_article,
  test_article
];


export default function ListView() {
  const { locale } = useContext(GlobalContext);
  const activeLocale = locale.activeLocale;

  const renderArticleListings = (articles) => {
    return articles.map((a, i) => {
      a.articleId = i;

      return (
        <ArticleListing
          key={a.articleId}
          eventKey={"" + a.articleId}
          article={a}
        />
      );
    });
  }

  return (
    <div>
      <Accordion defaultActiveKey="-1">
        <FilterForm />
      </Accordion>
      <br />
      <h2>{getTranslation(activeLocale, "list-view.listings-caption")}</h2>
      <Accordion defaultActiveKey="-1">
        {renderArticleListings(TEST_ARTICLES)}
      </Accordion>
    </div>
  );
}
