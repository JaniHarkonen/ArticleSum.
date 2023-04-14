import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../ArticleListing/ArticleListing";
import useFormModal from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import SelectableElement from "../SelectableElement/SelectableElement";
import { Fragment } from "react";


export const DEFAULT_SETTINGS = {
  defaultActiveKey: "-1",
  ListingWrapper: (listing, item) => <>{listing}</>
};

export default function ArticleList(props) {
  const defaultActiveKey = props.defaultActiveKey || "-1";
  const articles = props.articles;
  const ListingWrapper = props.ListingWrapper || DEFAULT_SETTINGS.ListingWrapper;
  /*const allowListingSelection = props.allowListingSelection;
  const onListingChange = props.onListingChange;
  const listingValues = props.listingValues;*/
  //const ListingContainer = (allowListingSelection) ? SelectableElement : Fragment;
  const {popup} = useFormModal();

  /*const handleListingChange = (item, value) => {
    onListingChange({
      listing: item,
      value: value
    });
  };*/

  const renderArticleListings = () => {
    return articles.map((item) => {
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
    <Accordion defaultActiveKey={defaultActiveKey}>
      {renderArticleListings()}
    </Accordion>
  );
}
