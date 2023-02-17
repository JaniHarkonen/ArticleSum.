import FilterForm from "../../forms/FilterForm/FilterForm"
import Accordion from "react-bootstrap/Accordion"
import TagList from "../../components/TagList/TagList";
import TagControlPanel from "../../components/TagControlPanel/TagControlPanel";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TagFilters from "../../forms/FilterForm/TagFilterForm/TagFilters";


export default function TagsView() {
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <>
      <Accordion defaultActiveKey={-1}>
        <FilterForm>
          <TagFilters />
        </FilterForm>
      </Accordion>
      <TagControlPanel />
      <br />
      <h2>{lm.translate("tags-view.listings-caption")}</h2>
      <TagList />
    </>
  );
}
