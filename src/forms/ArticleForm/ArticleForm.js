import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Styles } from "./ArticleForm.styles"
import { mapElements } from "../../utils/mapElements";
import ArticleTag from "../../components/ArticleTag/ArticleTag";
import { useContext, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import EditableText from "../../components/EditableText/EditableText";
import { convertDatetimeStringToDefaultDate } from "../../utils/dates";


export default function ArticleForm(props) {
  const lpCategory = "forms.article-form.";
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const [resolvedTags, setResolvedTags] = useState([]);
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

  useLayoutEffect(() => {
    const tagContainer = wm.getTagContainer();
    setResolvedTags(tags.map((tag) => tagContainer.getItem(tag)));
  }, []);

  const renderTags = (tags) => {
    return tags.map((tag) => {
      if( !tag )
      return <></>;

      return (
        <ArticleTag
          name={tag.name}
          color={tag.color}
        />
      );
    });
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
            onChange={(e) => setPublishDate(e.target.value)}
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
            inline
            value={readDate}
            onChange={(e) => setReadDate(e.target.value)}
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
        <Form.Label><b>{lm.translate(lpCategory + "tags")}: </b></Form.Label> {renderTags(resolvedTags)}
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
