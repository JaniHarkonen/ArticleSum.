import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Tag } from "../../model/components/Tag";
import Container, { Result } from "../../model/WorkspaceManager/Container";


export default function useTagForm(baseInstance) {
  const {workspaceManager: wm, closeModal} = useContext(GlobalContext);
  const [tagId, setTagId] = useState(baseInstance.tagId);
  const [tagName, setTagName] = useState(baseInstance.name);
  const [tagColor, setTagColor] = useState(baseInstance.color);

  const data = {
    tagId,
    tagName,
    tagColor
  };

  const setters = {
    setTagId,
    setTagName,
    setTagColor
  };

  const actionSubmitChanges = () => {
    const postTag = Tag({
      tagId: tagId,
      name: tagName,
      color: tagColor
    });

    wm.getTagContainer().postItem(postTag);
    closeModal();
  };

  const actionDelete = () => {
    wm.getTagContainer().removeItem(baseInstance);  // Remove the tag from the workspace

      // Remove the tag from all of the articles that have it
    wm.getArticleContainer().updateAll((a) => {

        // Article doesn't have the tag -> ignore
      if( !a.tags.includes(baseInstance.tagId) )
      return Result(Container.ACTION_MODIFIED);

        // Artilce has the tag -> remove the tag
      a.tags = a.tags.filter((tag) => tag != baseInstance.tagId);

      return Result(Container.ACTION_MODIFIED, [a]);
    });

    closeModal();
  };

  const actions = {
    actionSubmitChanges,
    actionDelete,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return {data, setters, actions};
}
