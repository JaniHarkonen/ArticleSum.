import Badge from "react-bootstrap/Badge";
import { Color } from "../../model/components/Tag";


export default function ArticleTag(props) {
  const tagName = props.name;
  const tagColor = props.color || Color();
  const { r: red, g: green, b: blue } = tagColor;
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
