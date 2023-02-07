import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import FilterForm from "../../forms/FilterForm/FilterForm"
import Accordion from "react-bootstrap/Accordion"
import TagForm from "../../forms/TagForm/TagForm";


export default function TagsView() {
  return (
    <>
      <TagForm />
      <Accordion>
        <FilterForm>
          <ArticleFilters />
        </FilterForm>
      </Accordion>
    </>
  );
}
