import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import FilterForm from "../../forms/FilterForm/FilterForm"
import Accordion from "react-bootstrap/Accordion"
import TagList from "../../components/TagList/TagList";
import TagControlPanel from "../../components/TagControlPanel/TagControlPanel";


export default function TagsView() {
  return (
    <>
      <Accordion defaultActiveKey={-1}>
        <FilterForm>
          <ArticleFilters />
        </FilterForm>
      </Accordion>
      <TagControlPanel />
      <br />
      <h2>Tag list</h2>
      <TagList />
    </>
  );
}
