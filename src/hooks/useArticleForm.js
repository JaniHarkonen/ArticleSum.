import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Article } from "../model/components/Article";

export default function useArticleForm(baseInstance) {
  const {workspaceManager: wm, closeModal} = useContext(GlobalContext);
  const [articleId, setArticleId] = useState(baseInstance.id);
  const [articleTitle, setArticleTitle] = useState(baseInstance.title);
  const [articlePublishDate, setArticlePublishDate] = useState(baseInstance["publish-date"]);
  const [articleReadhDate, setArticleReadDate] = useState(baseInstance["read-date"]);
  const [articleSource, setArticleSource] = useState(baseInstance.source);
  const [articleTags, setArticleTags] = useState(baseInstance.tags);
  const [articleNotes, setArticleNotes] = useState(baseInstance.notes);

  const data = {
    articleId,
    articleTitle,
    articlePublishDate,
    articleReadhDate,
    articleSource,
    articleTags,
    articleNotes
  };

  const setters = {
    setArticleId,
    setArticleTitle,
    setArticlePublishDate,
    setArticleReadDate,
    setArticleSource,
    setArticleTags,
    setArticleNotes
  };

  const actionSaveChanges = () => {
    const postArticle = Article({
      id: articleId,
      title: articleTitle,
      "publish-date": articlePublishDate,
      "read-date": articleReadhDate,
      source: articleSource,
      tags: articleTags,
      notes: articleNotes
    });

    wm.getArticleContainer().postItem(postArticle);
  };

  const actions = {
    actionSaveChanges,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return {data, setters, actions};
}
