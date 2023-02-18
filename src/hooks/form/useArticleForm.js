import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import { convertDatetimeStringToDefaultDate, convertDefaultDateToDatetimeString } from "../../utils/dates";


export default function useArticleForm(baseInstance) {
  const {workspaceManager: wm, closeModal} = useContext(GlobalContext);
  const [id, setId] = useState(baseInstance.id);
  const [title, setTitle] = useState(baseInstance.title);
  const [publishDate, setPublishDate] = useState(convertDatetimeStringToDefaultDate(baseInstance["publish-date"]));
  const [readDate, setReadDate] = useState(convertDatetimeStringToDefaultDate(baseInstance["read-date"]));
  const [source, setSource] = useState(baseInstance.source);
  const [tags, setTags] = useState(baseInstance.tags);
  const [notes, setNotes] = useState(baseInstance.notes);

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
    const postArticle = Article({
      id: id,
      title: title,
      "publish-date": convertDefaultDateToDatetimeString(publishDate),
      "read-date": convertDefaultDateToDatetimeString(readDate),
      source: source,
      tags: tags,
      notes: notes
    });

    wm.getArticleContainer().postItem(postArticle);
  };

  const actions = {
    actionSubmitChanges,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return {data, setters, actions};
}
