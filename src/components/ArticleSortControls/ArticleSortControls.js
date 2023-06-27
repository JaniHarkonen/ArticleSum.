import Dropdown from "react-bootstrap/Dropdown";
import { useContext, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import { lowercaseFirstLetter } from "../../utils/stringUtils";

export const ARTICLE_SORT_CRITERIAS = {
  "publish-date": "publish-date",
  "read-date": "read-date"
};


export default function ArticleSortControls(props) {
  const onSelect = props.onSelect;
  const defaultCriteria = props.defaultCriteria;
  const [sortCriteria, setSortCriteria] = useState(defaultCriteria || ARTICLE_SORT_CRITERIAS["publish-date"]);
  const { languageManager: lm } = useContext(GlobalContext);

  
  const handleSelection = (key) => {
    onSelect(key);
    setSortCriteria(key);
  };


  return (
    <Dropdown drop="down" onSelect={handleSelection}>
      <Dropdown.Toggle>
        {lm.translate("article-sort-controls.sort-by")} {" : "}
        {lowercaseFirstLetter(lm.translate("forms.article-filter-form." + sortCriteria))}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={ARTICLE_SORT_CRITERIAS["publish-date"]}>
          {lm.translate("forms.article-filter-form.publish-date")}
        </Dropdown.Item>
        <Dropdown.Item eventKey={ARTICLE_SORT_CRITERIAS["read-date"]}>
          {lm.translate("forms.article-filter-form.read-date")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
