import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";

import DropdownSearch from "../DropdownSearch/DropdownSearch";
import ArticleTag from "../ArticleTag/ArticleTag";

import { Tag } from "../../model/components/Tag";

export const DEFAULT_SETTINGS = {
  validityChecker: (candidate) => false
};

/**
 * Provides a tag input component where the user can search for tags
 * using a `DropdownSearch` and then add them to the input by clicking 
 * a plus-sign. The tags can be removed from the selection by clicking 
 * them while holding down CTRL.
 */
export default function TagInput(props) {
  /**
   * Current selection as a string where the tags are separated with 
   * spaces. The string should consist of the names of the tags as the 
   * tag IDs are resolved by the parent component during form submission.
   */
  const value = props.value;

  /**
   * Hook that updates the parent component when a tag is added or removed
   * from the selection.
   */
  const onChange = props.onChange;

  /**
   * List of available tags that can be suggested to the user.
   */
  const availableTags = props.availableTags;

  /**
   * Function that determines whether a tag is valid. That is, if the tag 
   * exists.
   */
  const validityChecker = props.validityChecker || DEFAULT_SETTINGS.validityChecker;

  const [tagInventory, setTagInventory] = useState([]);
  const [tagNameInput, setTagNameInput] = useState("");

  useEffect(() => {
    setTagInventory(availableTags.map((tag) => tag.name));
  }, [availableTags]);

  /**
   * Handles the addition of a tag to the selection by first validating 
   * the tag using the `validityChecker` and then updating the parent 
   * component.
   */
  const handleAddition = () => {
    if( !validityChecker(tagNameInput) )
    return;

    onChange(value + ((value === "") ? "" : " ") + tagNameInput);
    setTagNameInput("");
  };

  /**
   * Handles the addition of a tag to the selection by first validating 
   * the tag using the `validityChecker` and then updating the parent 
   * component.
   */
  /**
   * Handles the removal of a tag from the selection by filtering out 
   * the given tag and updating the parent component.
   * 
   * The removal is only done if the CTRL-key is being held while 
   * clicking the tags.
   * 
   * @param {JSON} e Event-object from the onClick-event of a tag.
   * Used to determine whether CTRL was being held.
   * @param {Number} tagIndex The index of the tag in the tag selection
   * string (when split according to spaces) that is to be removed.
   */
  const handleRemoval = (e, tagIndex) => {
    if( !e.ctrlKey )
    return;
    
    const tags = value.split(" ");
    let newValue = "";
    for( let i = 0; i < tags.length; i++ )
    {
      if( i !== tagIndex )
      newValue += ((newValue === "") ? "" : " ") + tags[i];
    }

    onChange(newValue);
  };

  /**
   * Finds a tag given its name from the array of available tags.
   * This is done by iterating over the tags and stopping once 
   * a matching tag is found.
   * 
   * If no tag is found, a default tag will be returned with the 
   * given name.
   * 
   * @param {String} name Name of the tag that is to be searched.
   * 
   * @returns Reference to the matching tag or a default tag if 
   * no tag was found.
   */
  const getTagByName = (name) => {
    return availableTags.filter((tag) => tag.name === name)[0] || Tag({ name: name });
  };

  /**
   * Renders a tag selection using `ArticleTag`-components based on 
   * a given string, where the names of the tags are separated using 
   * spaces.
   * 
   * @param {String} tagString String that contains the current tag 
   * selection where tag names are separated using spaces.
   * 
   * @returns Array of `ArticleTags` that constitute the current 
   * tag selection.
   */
  const renderTagsFromString = (tagString) => {
    const tags = tagString.split(" ");

    return tags.map((tagWord, index) => {
      const tag = getTagByName(tagWord);
      if( !tagWord || tagWord === "" )
      return;

      return (
        <div
          key={"tag-input-tag-listing-" + tagWord}
          className="d-inline-block w-auto"
        >
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
          <div className={`d-inline-block ${(value === "") ? "" : "ms-2"}`}>
            <DropdownSearch
              value={tagNameInput}
              inventory={tagInventory}
              onChange={setTagNameInput}
            />
          </div>
          <div className={`d-inline-block ms-1 align-bottom`}>
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
