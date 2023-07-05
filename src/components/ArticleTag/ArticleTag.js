import Badge from "react-bootstrap/Badge";

import { Color } from "../../model/components/Tag";

/**
 * Renders a Bootstrap Badge that represents a tag with 
 * a given name and color. A possible onClick-function can 
 * also be provided that will be triggered when the user 
 * clicks the Badge.
 */
export default function ArticleTag(props) {
  /**
   * Name of the tag that will be displayed on the Badge.
   */
  const tagName = props.name;

  /**
   * Color of the tag Badge.
   */
  const tagColor = props.color || Color();

    // Destructure color
  const { r: red, g: green, b: blue } = tagColor;

  /**
   * Function that is called upon clicking the Badge.
   */
  const onClick = props.onClick;

  return (
    <Badge
      className="m-1 p-1"
      bg="default"
      role="button"
      style={{ background: `rgb(${red}, ${green}, ${blue})` }}
      onClick={onClick}
    >
      {tagName.toUpperCase()}
    </Badge>
  );
}
