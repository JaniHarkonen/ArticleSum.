/*import { GlobalContext } from "../../context/GlobalContext";
import { useState, useContext } from "react";
import { Article } from "../../model/components/Article";


export default function ArticleModal(props) {
  const article = props.article;
  const [articleId, setArticleId] = useState(article.id);
  const [articleTitle, setArticleTitle] = useState(article.title);
  const [articlePublishDate, setArticlePublishDate] = useState(article["publish-date"]);
  const [articleReadhDate, setArticleReadDate] = useState(article["read-date"]);
  const [articleSource, setArticleSource] = useState(article.source);
  const [articleTags, setArticleTags] = useState(article.tags);
  const [articleNotes, setArticleNotes] = useState(article.notes);

  const {workspaceManager: wm} = useContext(GlobalContext);

  const actionSaveChanges = () =>  {
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

  return (
    <FormModal

    />
  );
}
*/