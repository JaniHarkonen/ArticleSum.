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

/**
 * A simple component that lists all the tags of a given inventory.
 * This component is mostly used by the `TagsView` -major component.
 * The tags are rendered using `ArticleTag`-components. When the 
 * tags are clicked, a tag form popup modal is displayed where the 
 * user can edit tag information.
 * 
 * The tags can be wrapped inside a `ListingWrapper` to provide 
 * additional functionality, much like in `ArticleList` (see 
 * `ArticleList` for more information).
 */
export default function TagList(props) {
  /**
   * Inventory of tags that should be rendered.
   */
  const tags = props.tags || DEFAULT_SETTINGS.tags;

  /**
   * Wrapper element that can be used to wrap the listings and provide 
   * additional functionality or graphics to them. By default, 
   * no wrapper is applied.
   */
  const ListingWrapper = props.ListingWrapper || DEFAULT_SETTINGS.ListingWrapper;
  const { popup } = useFormModal();

  /**
   * Pops up tag form when a tag is clicked, to allow editing. First, 
   * a tag popup is created with the tag functioning as the base 
   * instance. Then the popup is displayed via the `useFormModal`-
   * hook.
   * 
   * @param {JSON} tag Tag that will be the base instance of the 
   * tag form popup.
   */
  const handleTagEdit = (tag) => {
    popup(createTagPopup(tag));
  };

  /**
   * Creates an array of `ArticleTags` that represent the inventory 
   * of tags passed onto the component. The tags will also be 
   * wrapped inside the `ListingWrapper`-wrapper, if one is 
   * specified.
   * 
   * @returns Array of `ArticleTags` possibly wrapped inside 
   * `ListingWrappers`.
   */
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
