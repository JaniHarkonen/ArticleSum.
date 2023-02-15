import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import FilterForm from "../../forms/FilterForm/FilterForm"
import Accordion from "react-bootstrap/Accordion"
import TagList from "../../components/TagList/TagList";
import TagControlPanel from "../../components/TagControlPanel/TagControlPanel";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";


export default function TagsView() {
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <>
      <Accordion defaultActiveKey={-1}>
        <FilterForm>
          <ArticleFilters />
        </FilterForm>
      </Accordion>
      <TagControlPanel />
      <br />
      <h2>{lm.translate("tags-view.listings-caption")}</h2>
      <TagList />
    </>
  );
}
