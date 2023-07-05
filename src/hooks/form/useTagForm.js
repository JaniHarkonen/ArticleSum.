import { useContext, useState } from "react";

import Container, { Result } from "../../model/WorkspaceManager/Container";

import { GlobalContext } from "../../context/GlobalContext";
import { Tag } from "../../model/components/Tag";

/**
 * Custom hook that provides the functionalities used by a tag 
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
 * - `tagId` which is the unique identifier of the tag
 * - `tagName` which is the name of the tag
 * - `tagColor` which is the color of the tag represented by a color 
 * JSON (see `colors`-utility module for more information)
 * 
 * The `setters` consists of setter hooks for each of the fields 
 * mentioned above.
 * 
 * When the tag form is first opened it will be based on a certain
 * instance (typically a JSON). The values of this instance will be 
 * copied to the state of the hook. Changes made to the state of the 
 * hook do not impact the base instance.
 * 
 * The `controls` provide the form with the following functionalities:
 * - `actionSubmitChanges` which submits the changes to the workspace 
 * `.asum`-file via the `WorkspaceManager`
 * - `actionDelete` which deletes the base instance from the workspace
 * - `actionCancel` which simply closes the modal
 */
export default function useTagForm(baseInstance) {
  const {workspaceManager: wm, closeModal} = useContext(GlobalContext);
  const [tagId, setTagId] = useState(baseInstance.tagId);
  const [tagName, setTagName] = useState(baseInstance.name);
  const [tagColor, setTagColor] = useState(baseInstance.color);

  /**
   * Tag identifier, name and color representing the state of the 
   * form.
   */
  const data = {
    tagId,
    tagName,
    tagColor
  };

  /**
   * Hooks that manipulate each state of the form.
   */
  const setters = {
    setTagId,
    setTagName,
    setTagColor
  };

  /**
   * Creates a new tag instance and copies the state of the form to it
   * when the user clicks "add" or "save". The tag is then posted to the 
   * workspace via the `WorkspaceManager`.
   */
  const actionSubmitChanges = (hooks) => {
    const postTag = Tag({
      tagId: tagId,
      name: tagName,
      color: tagColor
    });

    if( !tagName || tagName === "" )
    return;

    wm.getTagContainer().postItem(postTag);
    hooks.resetContentChangeFlag();
    closeModal();
  };

  /**
   * Deletes the base instance tag of the form when the user clicks "delete"
   * via the `WorkspaceManager`. The form modal will also close.
   */
  const actionDelete = () => {
    wm.getTagContainer().removeItem(baseInstance);  // Remove the tag from the workspace

      // Remove the tag from all of the articles that have it
    wm.getArticleContainer().updateAll((a) => {

        // Article doesn't have the tag -> ignore
      if( !a.tags.includes(baseInstance.tagId) )
      return Result(Container.ACTION_MODIFIED);

        // Artilce has the tag -> remove the tag
      a.tags = a.tags.filter((tag) => tag != baseInstance.tagId);

      return Result(Container.ACTION_MODIFIED, [a]);
    });

    closeModal();
  };

  /**
   * Actions for submitting changes, deletion and cancellation.
   */
  const actions = {
    actionSubmitChanges,
    actionDelete,
    actionCancel: closeModal  // closeModal is provided by the above context
  };

  return {data, setters, actions};
}
