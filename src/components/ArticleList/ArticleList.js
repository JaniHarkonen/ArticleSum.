import Accordion from "react-bootstrap/Accordion";

import { useContext, useEffect, useState } from "react";

import ArticleListing from "../ArticleListing/ArticleListing";
import PageControlPanel from "../PageControlPanel/PageControlPanel";

import { GlobalContext } from "../../context/GlobalContext";
import { checkArticleIssues } from "../../model/components/Article";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import useFormModal from "../../hooks/modal/useFormModal";

export const DEFAULT_SETTINGS = {
  defaultActiveKey: "-1",
  ListingWrapper: (Listing, item) => Listing,
  pageSettings: {
    allowPages: false,
    pageCapacity: 1
  }
};

/**
 * Provides a versatile, general purpose, list of articles that are 
 * rendered as expandable accordions. The articles will be listed 
 * vertically, and once expanded, they can be opened in a popup modal.
 * 
 * A `ListingWrapper` can be provided to the component that will then 
 * wrap the `ArticleListings` to provide additional functionality to 
 * the list (`SelectableElement`-wrapper, for example).
 * 
 * Additionally, page settings can also be provided to (dis)allow the 
 * arrangement of the articles onto pages. Page settings can be used 
 * to also determine the capacity (number of articles) of a page.
 * 
 * `useEffect` is used to arrange the articles into a arrays depending 
 * on the page that they are found on. The arrays are later used to 
 * determine which articles will be rendered. This arrangement is 
 * skipped, however, if no pages are allowed.
 */
export default function ArticleList(props) {
  /**
   * Accordion key of the article that is to be expanded by default or 
   * -1 for no default expansion.
   */
  const defaultActiveKey = props.defaultActiveKey || DEFAULT_SETTINGS.defaultActiveKey;

  /**
   * Array of articles that can be listed.
   */
  const allArticles = props.articles;

  /**
   * Wrapper element that can be used to wrap the listings and provide 
   * additional functionality or graphics to them. By default, 
   * no wrapper is applied.
   */
  const ListingWrapper = props.ListingWrapper || DEFAULT_SETTINGS.ListingWrapper;

  /**
   * Settings that determine whether pages are allowed as well as the 
   * capacity of a page.
   */
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

  /**
   * Constructs an array of listing elements based on the articles 
   * provided to the component. Only the articles visible on the 
   * current page will be shown, unless pages are disabled, in 
   * which case all available articles will be rendered.
   * 
   * If a `ListingWrapper` was provided, the listings will be 
   * wrapped inside them.
   * 
   * @returns An array of the listing elements.
   */
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
