import { useContext, useLayoutEffect, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import { tagsToString } from "../../model/components/Tag";

/**
 * Custom hook that provides the functionalities used by an article 
 * information form. The state, setters and control actions of the 
 * form are maintained here. This hook returns a JSON that is compatible 
 * with the `FormModal` meaning the JSON has the following fields:
 * - `data` which are the values that are to be passed onto the input 
 * fields rendered in `FormModal`
 * - `setters` which are the update hooks for the `data` likewise 
 * passed onto the forms of `FormModal`
 * - `controls` which are the control available for the form that will
 * be passed onto the `FormControlButtons` rendered in the `FormModal`
 * 
 * The `data` consists of the following fields:
 * - `id` which is the unique identifier of the article
 * - `title` which is the title of the article
 * - `publishDate` which is the publishing date of the article
 * - `readDate` which is the reading date of the article
 * - `source` which is the source link for the article
 * - `tags` which are the tags assigned to the article
 * - `notes` which are the notes of the article
 * 
 * The `setters` consists of setter hooks for each of the fields 
 * mentioned above.
 * 
 * When the article form is first opened it will be based on a certain
 * instance (typically a JSON). The values of this instance will be 
 * copied to the state of the hook. Changes made to the state of the 
 * hook do not impact the base instance.
 * 
 * The `controls` provide the form with the following functionalities:
 * - `actionSubmitChanges` which submits the changes to the workspace 
 * `.asum`-file via the `WorkspaceManager`
 * - `actionCancel` which simply closes the modal
 */
export default function useArticleForm(baseInstance) {
  const {workspaceManager: wm, closeModal} = useContext(GlobalContext);
  const [id, setId] = useState(baseInstance.id ? "" + baseInstance.id: null);
  const [title, setTitle] = useState(baseInstance.title);
  const [publishDate, setPublishDate] = useState(baseInstance["publish-date"]);
  const [readDate, setReadDate] = useState(baseInstance["read-date"]);
  const [source, setSource] = useState(baseInstance.source);
  const [tags, setTags] = useState("");   // Tags are in string format by default; must be converted into tag IDs
  const [notes, setNotes] = useState(baseInstance.notes);

    // Resolve tag names given their IDs
  useLayoutEffect(() => {
    const resolvedTags = baseInstance.tags.map((id) => wm.getTagContainer().getItem(id));
    setTags(tagsToString(resolvedTags));
  }, []);

  /**
   * Article identifier, title, publish date, read date, source,
   * tags and notes representing the state of the form.
   */
  const data = {
    id,
    title,
    publishDate,
    readDate,
    source,
    tags,
    notes
  };

  /**
   * Hooks that manipulate each state of the form.
   */
  const setters = {
    setId,
    setTitle,
    setPublishDate,
    setReadDate,
    setSource,
    setTags,
    setNotes
  };

  /**
   * Creates a new article instance and copies the state of the form to it
   * when the user clicks "add" or "save". The article is then posted to the 
   * workspace via the `WorkspaceManager`. Before the article is posted, its
   * tags are resolved by finding their identifiers based on their names.
   */
  const actionSubmitChanges = () => {
      
      // Resolve tag IDs given their names
    const tagNames = tags.split(" ");
    const tagIds = wm.getTagContainer().mapItems((tag) => {
      if( tagNames.includes(tag.name) )
      return "" + tag.tagId;
    });

    const postArticle = Article({
      id: id,
      title: title,
      "publish-date": publishDate,
      "read-date": readDate,
      source: source,
      tags: tagIds,
      notes: notes
    });

    wm.getArticleContainer().postItem(postArticle);
  };

  /**
   * Actions for submitting changes and cancellation.
   */
  const actions = {
    actionSubmitChanges,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return { data, setters, actions };
}
