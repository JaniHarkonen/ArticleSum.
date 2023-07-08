import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useContext, useEffect } from "react";

import TagInput from "../../components/TagInput/TagInput";
import EditableText from "../../components/EditableText/EditableText";
import Datepicker from "../../components/Datepicker/Datepicker";
import FormControlWithTab from "../../components/FormControlWithTab/FormControlWithTab";

import { GlobalContext } from "../../context/GlobalContext";
import { Styles } from "./ArticleForm.styles";
import { convertDateToDatetimestring } from "../../utils/dates";
import openLinkUsingHTTPS from "../../utils/openLinkUsingHTTPS";
import ASSETS from "../../assets/assets";
import addEventListenerTo from "../../utils/addEventListenerTo";

/**
 * Provides the form for article information input. The user can input 
 * the title, publish date, read date, source link, tags and notes of 
 * the article. Most of the fields are basic Bootstrap `Form.Control`-
 * components, however, some have additional features; dates can also 
 * be input via the calendar icon. The tag input is done using the 
 * `TagInput`-component where the user searches a tag using the input 
 * field and then adds the tag to the article by clicking the plus-sign.
 * 
 * The information of the form is provided via the `data`-prop and can 
 * be manipulated via the hooks found in `setters`-prop.
 */
export default function ArticleForm(props) {
  /**
   * Translation key prefix for the UI-elements of this component.
   */
  const lpCategory = "forms.article-form.";

  /**
   * Default Bootstrap-style class name for the rows of the form.
   */
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
    setNotes,
    setContentChanged
  } = props.setters;

  const { actionSubmitChanges } = props.actions;

  const resetContentChangeFlag = props.resetContentChangeFlag;

  useEffect(() => {
    return addEventListenerTo(document, {
      type: "keydown",
      listener: handleSpecialKeys
    })
  }, [
    id, 
    title, 
    publishDate, 
    readDate, 
    source, 
    tags, 
    notes
  ]);

  /**
   * Handles the toggling of the read date when the user clicks the 
   * check box. If the read date is empty, it is set to the current 
   * date. If the date is already input, it is reset to empty.
   */
  const handleReadDateCheck = () => {
    if( readDate && readDate !== "" )
    setReadDate("");
    else
    setReadDate(convertDateToDatetimestring(new Date()));
  };

  /**
   * Returns whether a given tag exists in the tag container of the 
   * `WorkspaceManager`.
   * 
   * @param {String} candidate Name of the tag candidate that is to 
   * be searched.
   * 
   * @returns Whether a tag with the given `candidate` name was found.
   */
  const checkTagValidity = (candidate) => {
    return wm.getTagContainer().itemExists((item) => item.name === candidate);
  };

  /**
   * Opens a given link in a browser using the `HTTPS`-protocol when the 
   * user clicks the source link icon.
   * 
   * @param {String} link Link to open.
   */
  const handleLinkOpen = (link) => {
    if( link && link !== "" )
    openLinkUsingHTTPS(link);
  };

  /**
   * Handles a change by updating the parent component as well as 
   * notifiying it of the changed content. This way, when the content
   * changes, the control buttons that may be reacting to changes 
   * will also be updated.
   * 
   * @param {Function} change The change itself as a function.
   */
  const handleChange = (change) => {
    change();
    setContentChanged(true);
  };

  /**
   * Handles the presses of special keys such as shortcuts and 
   * tab.
   * 
   * @param {JSON} e Event-object generated by the "keydown"-
   * event listening for special key presses.
   */
  const handleSpecialKeys = (e) => {
    if( e.ctrlKey )
    {
      const shortcutKey = e.key.toLowerCase()
      
      switch( shortcutKey )
      {
        case "s": actionSubmitChanges({ resetContentChangeFlag }); break;
      }
    }
  };

  return (
    <Form onSubmit={(e) => {e.preventDefault(); e.stopPropagation()}}>
      <Row>
        <Styles.ItemIdContainer>#{id}</Styles.ItemIdContainer>
      </Row>
      <Row className="position-relative">
        <h2><b>
          <EditableText
            onChange={(newTitle) => handleChange(() => setTitle(newTitle))}
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
            onChange={(value) => handleChange(() => setPublishDate(value + "T00:00Z"))}
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
                onChange={() => handleChange(() => handleReadDateCheck())}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Datepicker
            value={readDate}
            onChange={(value) => handleChange(() => setReadDate(value + "T00:00Z"))}
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
                onChange={(value) => handleChange(() => setSource(value))}
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
              onChange={(value) => handleChange(() => setTags(value))}
              availableTags={wm.getTagContainer().filterItems()}
              validityChecker={checkTagValidity}
            />
          </Row>
        </Form.Group>
      </Row>
      <Row className="mt-3">
        <Form.Group>
          <Form.Label><b>{lm.translate(lpCategory + "notes")}</b></Form.Label>
          <FormControlWithTab
            element={Form.Control}
            as="textarea"
            value={notes}
            rows="10"
            onChange={(e) => handleChange(() => setNotes(e.value))}
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
