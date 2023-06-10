import ArticleList from "../../../../components/ArticleList/ArticleList";
import { Styles } from "./DateSlot.styles";


export default function DateSlot(props) {
  const caption = props.caption;
  const articles = props.articles;

  return (
    <>
      <Styles.DateContainer>
        <h3>{caption}</h3>
      </Styles.DateContainer>
      <ArticleList
        articles={articles}
      />
    </>
  );
}
