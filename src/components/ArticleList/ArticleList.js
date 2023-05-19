import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../ArticleListing/ArticleListing";
import PageControlPanel from "../PageControlPanel/PageControlPanel";
import useFormModal from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";

import { useEffect, useState } from "react";


export const DEFAULT_SETTINGS = {
  defaultActiveKey: "-1",
  ListingWrapper: (Listing, item) => <>{Listing}</>,
  pageSettings: {
    allowPages: false,
    pageCapacity: 1
  }
};


export default function ArticleList(props) {
  const defaultActiveKey = props.defaultActiveKey || DEFAULT_SETTINGS.defaultActiveKey;
  const allArticles = props.articles;
  const ListingWrapper = props.ListingWrapper || DEFAULT_SETTINGS.ListingWrapper;
  const pageSettings = props.pageSettings || DEFAULT_SETTINGS.pageSettings;
  const { popup } = useFormModal();

  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);

    // Arranges all the available articles into different pages
  useEffect(() => {
    const groupedArticles = [];
    const pcapacity = pageSettings.pageCapacity;
    const numberOfArticles = allArticles.length;

    for( let i = 0; i < numberOfArticles; i += pcapacity )
    groupedArticles.push(allArticles.slice(i, Math.min(numberOfArticles, i + pcapacity)));

    setArticles(groupedArticles);
  }, []);

  const renderPageControls = () => {
    const articleGroup = articles[currentPage];
    const numberOfPages = articles.length;
    let shownItemCount = numberOfPages;

    if( articleGroup )
    shownItemCount = articleGroup.length;

    return (
      <PageControlPanel
        currentPage={currentPage}
        lastPage={numberOfPages - 1}
        onPageSelect={setCurrentPage}
      />
    );
  };

  const renderArticleListings = () => {
    const articleGroup = articles[currentPage] || [];

    return articleGroup.map((item) => {
      return (
        ListingWrapper(
          <ArticleListing
            key={"article-list-article-listing" + item.id}
            eventKey={"" + item.id}
            articleTitle={item.title}
            articleSource={item.source}
            actions={{
              onEdit: () => popup(createArticlePopup(item))
            }}
          />,
          item
        )
      );
    });
  };

  return (
    <>
      {pageSettings.allowPages && renderPageControls()}
      <Accordion defaultActiveKey={defaultActiveKey}>
        {renderArticleListings()}
      </Accordion>
    </>
  );
}
