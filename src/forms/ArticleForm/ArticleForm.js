import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Styles } from "./ArticleForm.styles"


const TEST_DEFAULT_ARTICLE = {
  articleId: 1,
  articleTitle: "what the fuck",
  articleSource: "pornhubdot.net",
  publishDate: "",
  readDate: "",
  articleTags: [],
  articleNotes: ""
};

export default function ArticleForm(props) {
  const article = props.article || TEST_DEFAULT_ARTICLE;
  const {
    articleId,
    articleTitle,
    articleSource,
    publishDate,
    readDate,
    articleTags,
    articleNotes
  } = article;

  const renderTags = (tags) => {
    return tags.map((t, i) => {
      return (
        <Badge
          key={t + i}
          className="m-1 p-1"
          bg="secondary"
          role="button"
        >
          {t}
        </Badge>
      );
    });
  };

  return (
    <Form>
      <Styles.ItemIdContainer>#{articleId}</Styles.ItemIdContainer>
      <h2><b>{articleTitle}</b></h2>
      <Form.Group
        as={Row}
      >
        <Form.Label column><b>Published: </b></Form.Label>
        <Col>
          <Form.Control
            value={publishDate}
          />
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
      >
        <Form.Label column><b>Read: </b></Form.Label>
        <Col>
          <Form.Control
            value={readDate}
          />
        </Col>
      </Form.Group>
      <embed 
        src="https://investors.finnair.com/~/media/Files/F/Finnair-IR/documents/fi/reports-and-presentation/2022/finnair-report-half-year-1-jan-30-sept-2022-fi.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      />
      <br/>
      <b>Source:</b> <a href={"https://" + articleSource}>{articleSource}</a>
      <Form.Group>
        <Form.Label><b>Tags: </b></Form.Label> {renderTags(articleTags)}
      </Form.Group>
      <br/>
      <Form.Group>
        <Form.Label><b>Notes</b></Form.Label>
        <Form.Control
          as="textarea"
          value={articleNotes}
        />
      </Form.Group>
    </Form>
  );
}
