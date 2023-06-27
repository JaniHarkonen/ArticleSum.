import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";

import DropdownSearch from "../DropdownSearch/DropdownSearch";
import ArticleTag from "../ArticleTag/ArticleTag";

import { Tag } from "../../model/components/Tag";

export const DEFAULT_SETTINGS = {
  validityChecker: (candidate) => false
};


export default function TagInput(props) {
  const value = props.value;
  const onChange = props.onChange;
  const availableTags = props.availableTags;
  const validityChecker = props.validityChecker || DEFAULT_SETTINGS.validityChecker;

  const [tagInventory, setTagInventory] = useState([]);
  const [tagNameInput, setTagNameInput] = useState("");

  useEffect(() => {
    setTagInventory(availableTags.map((tag) => tag.name));
  }, [availableTags]);

  const handleAddition = () => {
    if( !validityChecker(tagNameInput) )
    return;

    onChange(value + " " + tagNameInput);
    setTagNameInput("");
  };

  const handleRemoval = (e, tagIndex) => {
    if( !e.ctrlKey )
    return;
    
    const tags = value.split(" ");
    let newValue = tags[0];
    for( let i = 1; i < tags.length; i++ )
    {
      if( i !== tagIndex )
      newValue += " " + tags[i];
    }

    onChange(newValue);
  };

  const getTagByName = (name) => {
    return availableTags.filter((tag) => tag.name === name)[0] || Tag({ name: name });
  };

  const renderTagsFromString = (tagString) => {
    const tags = tagString.split(" ");

    return tags.map((tagWord, index) => {
      const tag = getTagByName(tagWord);
      if( !tagWord || tagWord === "" )
      return;

      return (
        <div className="d-inline-block w-auto">
          <ArticleTag
            key={"tag-input-tag-listing-" + tagWord}
            name={tag.name}
            color={tag.color}
            onClick={(e) => handleRemoval(e, index)}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div>
        {renderTagsFromString(value)}
        <div className="d-inline-block">
          <div className="d-inline-block ms-2">
            <DropdownSearch
              value={tagNameInput}
              inventory={tagInventory}
              onChange={setTagNameInput}
            />
          </div>
          <div className="d-inline-block ms-1 align-bottom">
            <Button
              className="d-inline-block rounded-circle"
              onClick={handleAddition}
              variant="outline-success"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
