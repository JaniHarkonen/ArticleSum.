import { Style } from "./ArticlePreview.styles";

export default function ArticlePreview(props) {
  const article = props.article;
  const onClick = props.onClick;

  return (
    <div onClick={onClick}>
      <Style.Arrow />
      <Style.PreviewContainer>
        <h4>{article.title}</h4>
        <p>Published: {article["publish-date"]}</p>
      </Style.PreviewContainer>
    </div>
  );
}
