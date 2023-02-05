import { useState, useEffect } from "react"
import FormControl from "react-bootstrap/FormControl";
import addEventListenerTo from "../../utils/addEventListenerTo";
import { Styles } from "./EditableText.styles";


export default function EditableText(props) {
  const text = props.children;
  const onChange = props.onChange || function(){};
  const [isEditing, setEditing] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    return addEventListenerTo(document, { type: "keypress", listener: handleEnterPress });
  }, [isEditing]);

  const handleEnterPress = (e) => {
    if( isEditing && e.code === "Enter" )
    setEditing(false);
  };

  return (
      isEditing ?
      <FormControl
        autoFocus={true}
        value={text}
        onBlur={() => setEditing(false)}
        onChange={onChange}
      />
      :
      <div
        style={isMouseOver ? Styles.textContainerHighlight : {}}
        onClick={() => setEditing(true)}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {text}
      </div>
  );
}
