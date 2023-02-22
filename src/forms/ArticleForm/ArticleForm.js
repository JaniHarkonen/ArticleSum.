import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Styles } from "./ArticleForm.styles"
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import EditableText from "../../components/EditableText/EditableText";
import Datepicker from "../../components/Datepicker/Datepicker";
import TaggedFormControl from "../../components/TaggedFormControl/TaggedFormControl";


export default function ArticleForm(props) {
  const lpCategory = "forms.article-form.";
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
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
    setTitle,
    setPublishDate,
    setReadDate,
    setSource,
    setTags,
    setNotes
  } = props.setters;

  return (
    <Form>
      <Styles.ItemIdContainer>#{id}</Styles.ItemIdContainer>
      <h2><b><EditableText onChange={setTitle}>{title}</EditableText></b></h2>
      <Form.Group
        as={Row}
      >
        <Form.Label column><b>{lm.translate(lpCategory + "publish-date")}: </b></Form.Label>
        <Col>
          <Datepicker
            value={publishDate}
            onChange={(value) => setPublishDate(value + "T00:00Z")}
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
          <Datepicker
            value={readDate}
            onChange={(value) => setReadDate(value + "T00:00Z")}
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
        <Form.Label><b>{lm.translate(lpCategory + "tags")}: </b></Form.Label>
        <TaggedFormControl
          value={tags}
          onChange={setTags}
          availableTags={wm.getTagContainer().filterItems()}
        />
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
