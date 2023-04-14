import { useContext, Fragment } from "react";

import ArticleTag from "../ArticleTag/ArticleTag";
import useFormModal from "../../hooks/modal/useFormModal";
import createTagPopup from "../../modals/create/tag/createTagPopup"

import { GlobalContext } from "../../context/GlobalContext";
import { Styles } from "./TagList.styles";


export const ELEMENT_ID = {
  tagSizeContainer: "tag-size-container"
};

export default function TagList() {
  const { workspaceManager: ws } = useContext(GlobalContext);
  const { popup } = useFormModal();
  const tagContainer = ws.getTagContainer();

  const handleTagEdit = (tag) => {
    popup(createTagPopup(tag));
  };

  const renderTags = () => {
    return tagContainer.mapItems((tag) => {
      return (
        <Styles.TagContainer key={"tag-list-article-tag-" + tag.tagId}>
          <ArticleTag
            name={tag.name}
            color={tag.color}
            onClick={() => handleTagEdit(tag)}
          />
          <br />
        </Styles.TagContainer>
      );
    });
  };

  return (
    <Styles.Content>
      {renderTags()}
    </Styles.Content>
  );
}
