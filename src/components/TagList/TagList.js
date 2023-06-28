import ArticleTag from "../ArticleTag/ArticleTag";

import useFormModal from "../../hooks/modal/useFormModal";
import createTagPopup from "../../modals/create/tag/createTagPopup"

export const ELEMENT_ID = {
  tagSizeContainer: "tag-size-container"
};

export const DEFAULT_SETTINGS = {
  tags: [],
  ListingWrapper: (Listing, item) => Listing
};


export default function TagList(props) {
  const tags = props.tags || DEFAULT_SETTINGS.tags;
  const ListingWrapper = props.ListingWrapper || DEFAULT_SETTINGS.ListingWrapper;
  const { popup } = useFormModal();

  const handleTagEdit = (tag) => {
    popup(createTagPopup(tag));
  };

  const renderTags = () => {
    return tags.map((tag) => {
      return (
        ListingWrapper(
          <div
            className="d-inline-block"
            key={"tag-list-article-tag-" + tag.tagId}
          >
            <ArticleTag
              name={tag.name}
              color={tag.color}
              onClick={() => handleTagEdit(tag)}
            />
          </div>,
          tag
        )
      );
    });
  };

  return (
    <div className="position-relative w-100 h-100">
      {renderTags()}
    </div>
  );
}
