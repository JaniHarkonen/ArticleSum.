import FormControl from "react-bootstrap/FormControl";

import { useState } from "react"

import { Styles } from "./EditableText.styles";
import useKeyListener from "../../hooks/keyboard/useKeyListener";

export const DEFAULT_SETTINGS = {
  onChange: (value) => {}
};

/**
 * A wrapper component that takes in text and allows it to be 
 * edited by the user upon double-click. When the text input is 
 * empty, a placeholder can be displayed. When the user hovers 
 * the mouse over the element, it will be highlighted with dashed 
 * borders to indicate editability.
 * 
 * Once the user double-clicks the element and enters edit-mode, a
 * Bootstrap Form.Control-component will be displayed where the 
 * text can be edited.
 */
export default function EditableText(props) {
  /**
   * Text that will be displayed. Passed in as a child, however, 
   * should strictly be a string.
   */
  const text = props.children;

  /**
   * Placeholder element that will be displayed if the text input 
   * is empty.
   */
  const placeholder = props.placeholder || <>&nbsp;</>;

  /**
   * Hook that updates the parent component when the text input 
   * changes upon editing.
   */
  const onChange = props.onChange || DEFAULT_SETTINGS.onChange;

  const [isEditing, setEditing] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);

  /**
   * Exits edit-mode when ENTER is pressed.
   */
  const handleEnterPress = () => {
    if( isEditing )
    setEditing(false);
  };

  useKeyListener({
    listeners: { Enter: handleEnterPress }
  });

  /**
   * Handles double-click by entering edit-mode.
   * 
   * @param {JSON} e Event-object from the onClick-event.
   */
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
      className="w-100"
      autoFocus={true}
      value={text}
      onBlur={() => setEditing(false)}
      onChange={(e) => onChange(e.target.value)}
    />
    :
    <div
      className="w-100"
      onClick={handleDoubleClick}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {(!text || text === "") ? <>{placeholder}</> : <>{text}</>}
      {isMouseOver && <Styles.Highlight />}
    </div>
  );
}
