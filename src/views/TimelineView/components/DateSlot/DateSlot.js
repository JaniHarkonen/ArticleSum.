import ArticleList from "../../../../components/ArticleList/ArticleList";

import { Styles } from "./DateSlot.styles";

/**
 * Simple component that renders an `ArticleList` inside a 
 * date slot. The list consists of given articles.
 */
export default function DateSlot(props) {
  /**
   * Caption displayed on top of the date slot.
   */
  const caption = props.caption;

  /**
   * Articles contained in the date slot.
   */
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
