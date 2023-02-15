import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Tag } from "../../model/components/Tag";


export default function useArticleForm(baseInstance) {
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
  };

  const actions = {
    actionSubmitChanges,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return {data, setters, actions};
}
