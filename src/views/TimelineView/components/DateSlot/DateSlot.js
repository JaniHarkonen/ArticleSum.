import ArticleList from "../../../../components/ArticleList/ArticleList";
import { convertDatetimeStringToDefaultDate } from "../../../../utils/dates";
import { Styles } from "./DateSlot.styles";


export default function DateSlot(props) {
  const date = props.date;
  const articles = props.articles;

  return (
    <>
      <Styles.DateContainer>
        <h3>{convertDatetimeStringToDefaultDate(date)}</h3>
      </Styles.DateContainer>
      <ArticleList
        articles={articles}
      />
    </>
  );
}
