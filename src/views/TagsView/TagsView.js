import Row from "react-bootstrap/Row";

import { useContext } from "react";

import TagList from "../../components/TagList/TagList";
import TagControlPanel from "../../components/TagControlPanel/TagControlPanel";

import { GlobalContext } from "../../context/GlobalContext";


export default function TagsView() {
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <>
      <Row className="d-flex">
        <div className="col-auto">
          <h2>{lm.translate("tags-view.listings-caption")}</h2>
        </div>
        <div className="d-flex align-items-center col-auto">
          <TagControlPanel />
        </div>
      </Row>
      <Row className="mt-3">
        <TagList />
      </Row>
    </>
  );
}
