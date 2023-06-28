import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useContext } from "react";

import TagInput from "../../components/TagInput/TagInput";
import EditableText from "../../components/EditableText/EditableText";
import Datepicker from "../../components/Datepicker/Datepicker";

import { GlobalContext } from "../../context/GlobalContext";
import { Styles } from "./ArticleForm.styles";
import { convertDateToDatetimestring } from "../../utils/dates";
import openLinkUsingHTTPS from "../../utils/openLinkUsingHTTPS";
import ASSETS from "../../assets/assets";


export default function ArticleForm(props) {
  const lpCategory = "forms.article-form.";
  const itemClassName = "mt-1";
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  const {
    id,
    title,
    publishDate,
    readDate,
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

  const handleReadDateCheck = () => {
    if( readDate && readDate !== "" )
    setReadDate("");
    else
    setReadDate(convertDateToDatetimestring(new Date()));
  };

  const checkTagValidity = (candidate) => {
    return wm.getTagContainer().itemExists((item) => item.name === candidate);
  };

  const handleLinkOpen = (link) => {
    if( !link && link !== "" )
    openLinkUsingHTTPS(link);
  };

  return (
    <Form onSubmit={(e) => {e.preventDefault(); e.stopPropagation()}}>
      <Row>
        <Styles.ItemIdContainer>#{id}</Styles.ItemIdContainer>
      </Row>
      <Row className="position-relative">
        <h2><b>
          <EditableText
            onChange={setTitle}
            placeholder={<Styles.EditableTextPlaceholder>{lm.translate(lpCategory + "placeholders.title")}</Styles.EditableTextPlaceholder>}
          >
            {title}
          </EditableText>
        </b></h2>
      </Row>
      <Form.Group
        className={itemClassName}
        as={Row}
      >
        <Col>
          <Form.Label column><b>{lm.translate(lpCategory + "publish-date")}: </b></Form.Label>
        </Col>
        <Col>
          <Datepicker
            value={publishDate}
            onChange={(value) => setPublishDate(value + "T00:00Z")}
          />
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
        className={itemClassName}
      >
        <Col>
          <Row>
            <Col>
              <Form.Label column><b>{lm.translate(lpCategory + "read-date")}: </b></Form.Label>
            </Col>
            <Col className="d-flex justify-content-end align-items-center p-0 m-0">
              <Form.Check
                checked={!!readDate}
                onChange={handleReadDateCheck}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Datepicker
            value={readDate}
            onChange={(value) => setReadDate(value + "T00:00Z")}
          />
        </Col>
      </Form.Group>
      {/*<embed 
        src="https://investors.finnair.com/~/media/Files/F/Finnair-IR/documents/fi/reports-and-presentation/2022/finnair-report-half-year-1-jan-30-sept-2022-fi.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
  />*/}
      <Form.Group
        className={itemClassName}
        as={Row}
      >
        <Row>
          <Form.Label><b>{lm.translate(lpCategory + "source")}:</b></Form.Label>
        </Row>
        <Row>
          <Col
            className="d-flex p-0 m-0 justify-content-center align-items-center"
            xs="1"
          >
            <Button
              className="d-flex justify-content-center align-items-center p-0 border-none"
              onClick={() => handleLinkOpen(source)}
              style={{ width: "24px", height: "24px" }}
              variant="light-outline"
            >
              <Image
                className="w-100 h-100 p-0 m-0"
                src={ASSETS.black.icon.linkPopup}
              />
            </Button>
          </Col>
          <Col className="p-0 m-0">
            <div className="position-relative">
              <EditableText
                onChange={setSource}
                placeholder={<Styles.EditableTextPlaceholder>{lm.translate(lpCategory + "placeholders.source")}</Styles.EditableTextPlaceholder>}
              >
                {source}
              </EditableText>
            </div>
          </Col>
        </Row>
      </Form.Group>
      <Row className={itemClassName}>
        <Form.Group>
          <Row>
            <Form.Label>
              <b>{lm.translate(lpCategory + "tags")}: </b>
              <Styles.TagRemovalHint>({lm.translate(lpCategory + "hints.remove-tags")})</Styles.TagRemovalHint>
            </Form.Label>
          </Row>
          <Row>
            <TagInput
              value={tags}
              onChange={setTags}
              availableTags={wm.getTagContainer().filterItems()}
              validityChecker={checkTagValidity}
            />
          </Row>
        </Form.Group>
      </Row>
      <Row className="mt-3">
        <Form.Group>
          <Form.Label><b>{lm.translate(lpCategory + "notes")}</b></Form.Label>
          <Form.Control
            as="textarea"
            value={notes}
            rows="10"
            onChange={(e) => setNotes(e.target.value)}
            style={{
              fontFamily: "courier",
              fontSize: "15px"
            }}
          />
        </Form.Group>
      </Row>
    </Form>
  );
}
