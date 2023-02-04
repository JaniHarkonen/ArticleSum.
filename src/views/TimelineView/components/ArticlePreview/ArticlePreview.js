import { Style } from "./ArticlePreview.styles";

export default function ArticlePreview(props) {
  const arrowX = props.arrowX;
  const article = props.article;
  const onClick = props.onClick;
  const onMouseOver = props.onMouseOver;
  const onMouseLeave = props.onMouseLeave;

  const renderArrow = (x) => {
    return <Style.Arrow style={{ left: (x - 32) + "px" }} />;
  };

  return (
    <div onClick={onClick}>
      <Style.ArrowContainer>
        {renderArrow(arrowX)}
      </Style.ArrowContainer>
      <Style.PreviewContainer
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <h4>{article.title}</h4>
        <p>Published: {article["publish-date"]}</p>
      </Style.PreviewContainer>
    </div>
  );
}
