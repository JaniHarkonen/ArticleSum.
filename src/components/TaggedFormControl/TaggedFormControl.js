import { useState } from "react";
import Form from "react-bootstrap/Form";
import ArticleTag from "../ArticleTag/ArticleTag";
import { Tag } from "../../model/components/Tag";
import DropdownSearch from "../DropdownSearch/DropdownSearch";


export default function TaggedFormControl(props) {
  const value = props.value;
  const onChange = props.onChange;
  const availableTags = props.availableTags;
  const [isEditing, setEditing] = useState(false);

  const getTagByName = (name) => {
    return availableTags.filter((tag) => tag.name === name)[0] || Tag({ name: name });
  };

  const renderTagsFromString = (string) => {
    if( !string || string === "" )
    return <>&nbsp;</>;

    return string.split(" ").map((word) => {
      const tag = getTagByName(word);
      
      return (
        <ArticleTag
          key={"tagged-form-control-tag-" + word}
          name={tag.name}
          color={tag.color}
        />
      );
    });
  };

  const renderAsDiv = () => {
    return (
      <Form.Control
        as="div"
        onClick={() => setEditing(true)}
      >
        {renderTagsFromString(value)}
      </Form.Control>
    );
  };

  const renderAsInput = () => {
    return (
      <DropdownSearch
        value={value}
        inventory={availableTags.map((tag) => tag.name)}
        onChange={onChange}
        onBlur={() => setEditing(false)}
        multiInput
      />
    );
  };

  return isEditing ? renderAsInput() : renderAsDiv();
}
