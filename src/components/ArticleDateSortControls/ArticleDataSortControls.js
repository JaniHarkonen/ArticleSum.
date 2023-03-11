import Dropdown from "react-bootstrap/Dropdown";
import { compareDateStrings } from "../../utils/sortComparisons";


export default function ArticleDataSortControls(props) {
  const articles = props.articles;
  const setArticles = props.setArticles || function(ars) {};

  const handleSelect = (criteriaKey) => {
    switch( criteriaKey )
    {
      case "publish": setArticles(articles.sort((a1, a2) => compareDateStrings(a1.publishDate, a2.publishDate))); break;
      case "read": setArticles(articles.sort((a1, a2) => compareDateStrings(a1.readDate, a2.readDate))); break;
    }
  };


  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle>{"Sort by:"}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={"publish"}>{"Publish date"}</Dropdown.Item>
        <Dropdown.Item eventKey={"read"}>{"Read date"}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}