import { useContext, Fragment } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleTag from "../ArticleTag/ArticleTag";
import useFormPopup from "../../hooks/useFormPopup";
import createTagPopup from "../../modal/create/tag/createTagPopup"


export default function TagList() {
  const { workspaceManager: ws } = useContext(GlobalContext);
  const { popup } = useFormPopup();

  const handleTagEdit = (tag) => {
    popup(createTagPopup(tag));
  };

  return ws.getTagContainer().mapItems((tag) => {
    return (
      <Fragment key={"tag-list-article-tag" + tag.tagId}>
        <ArticleTag
          name={tag.name}
          color={tag.color}
          onClick={() => handleTagEdit(tag)}
        />
        <br />
      </Fragment>
    );
  });
}
