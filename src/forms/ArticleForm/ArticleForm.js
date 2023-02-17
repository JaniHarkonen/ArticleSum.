import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Styles } from "./ArticleForm.styles"
import { mapElements } from "../../utils/mapElements";
import ArticleTag from "../../components/ArticleTag/ArticleTag";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import EditableText from "../../components/EditableText/EditableText";


export default function ArticleForm(props) {
  const lpCategory = "forms.article-form.";
  const { languageManager: lm } = useContext(GlobalContext);
  const {
    id,
    title,
    publishDate: publishDate,
    readDate: readDate,
    source,
    tags,
    notes
  } = props.data;
  const {
    setId,
    setTitle,
    setPublishDate,
    setReadDate,
    setSource,
    setTags,
    setNotes
  } = props.setters;

  const renderTags = (tags) => {
    return mapElements(
      tags, (key, tag) => {
        return (
          <ArticleTag
            key={key}
            tag={tag}
          />
        );
      },
      "article-form-tags-"
    );
  };

  return (
    <Form>
      <Styles.ItemIdContainer>#{id}</Styles.ItemIdContainer>
      <h2><b><EditableText onChange={setTitle}>{title}</EditableText></b></h2>
      <Form.Group
        as={Row}
      >
        <Form.Label column><b>{lm.translate(lpCategory + "publish-date")}: </b></Form.Label>
        <Col>
          <Form.Control
            value={publishDate}
          />
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
      >
        <Form.Label column><b>{lm.translate(lpCategory + "read-date")}: </b></Form.Label>
        <Col lg="1">
          <Form.Check/>
        </Col>
        <Col>
          <Form.Control
            value={readDate}
            inline
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
      <b>{lm.translate(lpCategory + "source")}:</b> <a href={"https://" + source}>{source}</a>
      <Form.Group>
        <Form.Label><b>{lm.translate(lpCategory + "tags")}: </b></Form.Label> {/*renderTags(articleTags)*/}
      </Form.Group>
      <Form.Group>
        <Form.Label><b>{lm.translate(lpCategory + "notes")}</b></Form.Label>
        <Form.Control
          as="textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}
