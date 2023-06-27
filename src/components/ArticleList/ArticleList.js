import Accordion from "react-bootstrap/Accordion";
import PageControlPanel from "../PageControlPanel/PageControlPanel";

import { useContext, useEffect, useState } from "react";
import useFormModal from "../../hooks/modal/useFormModal";

import ArticleListing from "../ArticleListing/ArticleListing";

import { GlobalContext } from "../../context/GlobalContext";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import { checkArticleIssues } from "../../model/components/Article";


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

  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const { popup } = useFormModal();
  const { languageManager: lm } = useContext(GlobalContext);

    // Arranges all the available articles into different pages
  useEffect(() => {
    let groupedArticles = [];

      // Only use pages when they are allowed by the pageSettings
    if( pageSettings.allowPages )
    {
      const pcapacity = pageSettings.pageCapacity;
      const numberOfArticles = allArticles.length;

      for( let i = 0; i < numberOfArticles; i += pcapacity )
      groupedArticles.push(allArticles.slice(i, Math.min(numberOfArticles, i + pcapacity)));
    }
    else
    groupedArticles = [allArticles];  // Otherwise, use a single page

    setArticles(groupedArticles);
  }, [allArticles]);

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
      const issues = checkArticleIssues(item);
      let warning = null;

      if( issues.hasIssues )
      warning = lm.translate("article-list.warning") + " (" + issues.issueCount + ")";

      return (
        ListingWrapper(
          <ArticleListing
            key={"article-list-article-listing" + item.id}
            eventKey={"" + item.id}
            articleTitle={item.title}
            articleSource={item.source}
            warning={warning}
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
      <div className={pageSettings.allowPages ? "mb-3" : ""}>
        <Accordion defaultActiveKey={defaultActiveKey}>
          {renderArticleListings()}
        </Accordion>
      </div>
      {
        pageSettings.allowPages &&
        <div className="d-flex justify-content-center">
          {renderPageControls()}
        </div>
      }
    </>
  );
}
