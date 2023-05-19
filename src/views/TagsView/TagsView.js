import { useContext } from "react";

import TagList from "../../components/TagList/TagList";
import TagControlPanel from "../../components/TagControlPanel/TagControlPanel";
import { GlobalContext } from "../../context/GlobalContext";


export default function TagsView() {
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <>
      <TagControlPanel />
      <br />
      <h2>{lm.translate("tags-view.listings-caption")}</h2>
      <TagList />
    </>
  );
}
