import Accordion from "react-bootstrap/Accordion";
import ArticleListing from "../ArticleListing/ArticleListing";
import useFormModal from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";


export default function ArticleList(props) {
  const defaultActiveKey = props.defaultActiveKey || "-1";
  const articles = props.articles;
  const {popup} = useFormModal();


  const renderArticleListings = () => {
    return articles.map((item) => {
      return (
        <ArticleListing
          key={"article-list-article-listing" + item.id}
          eventKey={"" + item.id}
          articleTitle={item.title}
          articleSource={item.source}
          actions={{
            onEdit: () => popup(createArticlePopup(item))
          }}
        />
      );
    });
  };

  return (
    <Accordion defaultActiveKey={defaultActiveKey}>
      {renderArticleListings()}
    </Accordion>
  );
}
