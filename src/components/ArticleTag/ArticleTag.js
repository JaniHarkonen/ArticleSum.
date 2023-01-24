import Badge from "react-bootstrap/Badge";


export default function ArticleTag(props) {
  const { tag } = props;

  return (
    <Badge
      className="m-1 p-1"
      bg="secondary"
      role="button"
    >
      {tag}
    </Badge>
  );
}
