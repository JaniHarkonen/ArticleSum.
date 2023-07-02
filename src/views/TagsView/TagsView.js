import Row from "react-bootstrap/Row";

import { useContext, useLayoutEffect, useState } from "react";

import TagList from "../../components/TagList/TagList";
import TagControlPanel from "../../components/TagControlPanel/TagControlPanel";

import { GlobalContext } from "../../context/GlobalContext";

/**
 * Major view component that renders the tag inventory used 
 * by the workspace.
 * 
 * The user can add new tags by clicking the "add"-button or 
 * edit existing tags by clicking the tag badges. When a tag 
 * is being edited, it is diplayed in a form modal popup 
 * window.
 */
export default function TagsView() {
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const tagContainer = wm.getTagContainer();
  const [tags, setTags] = useState([]);

  useLayoutEffect(() => {
    setTags(tagContainer.filterItems());
  }, [tagContainer]);

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
        <TagList tags={tags}/>
      </Row>
    </>
  );
}
