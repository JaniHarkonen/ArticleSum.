import { useContext, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import { tagsToString } from "../../model/components/Tag";


export default function useArticleForm(baseInstance) {
  const {workspaceManager: wm, closeModal} = useContext(GlobalContext);
  const [id, setId] = useState(baseInstance.id ? "" + baseInstance.id: null);
  const [title, setTitle] = useState(baseInstance.title);
  const [publishDate, setPublishDate] = useState(baseInstance["publish-date"]);
  const [readDate, setReadDate] = useState(baseInstance["read-date"]);
  const [source, setSource] = useState(baseInstance.source);
  const [tags, setTags] = useState("");   // Tags are in string format by default; must be converted into tag IDs
  const [notes, setNotes] = useState(baseInstance.notes);


    // Resolve tag names given their IDs
  useLayoutEffect(() => {
    const resolvedTags = baseInstance.tags.map((id) => wm.getTagContainer().getItem(id));
    setTags(tagsToString(resolvedTags));
  }, []);


  const data = {
    id,
    title,
    publishDate,
    readDate,
    source,
    tags,
    notes
  };

  const setters = {
    setId,
    setTitle,
    setPublishDate,
    setReadDate,
    setSource,
    setTags,
    setNotes
  };

  const actionSubmitChanges = () => {
      
      // Resolve tag IDs given their names
    const tagNames = tags.split(" ");
    const tagIds = wm.getTagContainer().mapItems((tag) => {
      if( tagNames.includes(tag.name) )
      return "" + tag.tagId;
    });

    const postArticle = Article({
      id: id,
      title: title,
      "publish-date": publishDate,
      "read-date": readDate,
      source: source,
      tags: tagIds,
      notes: notes
    });

    wm.getArticleContainer().postItem(postArticle);
  };

  const actions = {
    actionSubmitChanges,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return { data, setters, actions };
}
