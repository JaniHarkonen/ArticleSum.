import Badge from "react-bootstrap/Badge";


export default function ArticleTag(props) {
  const tagName = props.name;
  const tagColor = props.color;
  const { r: red, g: green, b: blue } = tagColor;

  return (
    <Badge
      className="m-1 p-1"
      bg="default"
      role="button"
      style={{ background: `rgb(${red}, ${green}, ${blue})` }}
    >
      {tagName}
    </Badge>
  );
}
