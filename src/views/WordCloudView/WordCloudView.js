import { useContext, useState } from "react";
import TaggedFormControl from "../../components/TaggedFormControl/TaggedFormControl";
import { GlobalContext } from "../../context/GlobalContext";


export default function WordCloudView(props) {
  const [value, setValue] = useState("");
  const { workspaceManager: wm } = useContext(GlobalContext);

  return (
    <TaggedFormControl
      value={value}
      onChange={setValue}
      availableTags={wm.getTagContainer().filterItems()}
    />
  );
}
