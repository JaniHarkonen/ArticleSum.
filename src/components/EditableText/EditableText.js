import { useState } from "react"
import FormControl from "react-bootstrap/FormControl";
import useKeyListener from "../../hooks/keyboard/useKeyListener";
import { renderStringOrEmptyFiller } from "../../utils/stringUtils";
import { Styles } from "./EditableText.styles";


export default function EditableText(props) {
  const text = props.children;
  const onChange = props.onChange || function(){};
  const [isEditing, setEditing] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);

  const handleEnterPress = () => {
    if( isEditing )
    setEditing(false);
  };

  useKeyListener({
    listeners: { Enter: handleEnterPress }
  });

  const handleDoubleClick = (e) => {
    if( e.detail == 2 )
    {
      setEditing(true);
      setMouseOver(false);
    }
  };

  return (
    isEditing ?
    <FormControl
      autoFocus={true}
      value={text}
      onBlur={() => setEditing(false)}
      onChange={(e) => onChange(e.target.value)}
    />
    :
    <div
      onClick={handleDoubleClick}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {renderStringOrEmptyFiller(text)}
      {isMouseOver && <Styles.Highlight />}
    </div>
  );
}
