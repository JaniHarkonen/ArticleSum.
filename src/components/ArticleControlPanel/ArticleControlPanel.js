import Form from "react-bootstrap/Form";

import { useContext } from "react";

import { Article } from "../../model/components/Article";
import { GlobalContext } from "../../context/GlobalContext";
import useFormPopup from "../../hooks/modal/useFormModal";
import createArticlePopup from "../../modals/create/article/createArticlePopup";
import applyArticleAdd from "../../modals/create/article/applyArticleAdd";
import createButtons from "../../utils/createButtons";

export const DEFAULT_SETTINGS = {
  selection: []
};

/**
 * Provides a basic article control panel with two buttons with following 
 * functionalities:
 * - article addition via a popup
 * - article deletion according to a selection
 * 
 * The `useFormPopup`-hook is used to popup the empty article form where the 
 * article information is entered. The popup itself is generated using the 
 * creators and appliers found in /modals/create/article.
 * 
 * `WorkspaceManager` is used to access its article container when deleting 
 * (filtering) articles.
 */
export default function ArticleControlPanel(props) {
  /**
   * JSON of the articles that have been selected for deletion and will be 
   * deleted upon clicking "delete". The JSON should hold keys named according 
   * to the IDs of the articles that are to be deleted coupled with either 
   * `true` or `false` depending on whether they should be deleted or not.
   */
  const selection = props.selection || DEFAULT_SETTINGS.selection;
  const { popup } = useFormPopup();
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);
  
  /**
   * Called upon clicking "add". Creates a dummy `Article`-instance with 
   * default values. An article popup is then created where the dummy `Article`
   * is then passed into. Finally, addition is applied to the article popup to 
   * override the default "save"-button. The popup is then displayed.
   */
  const handleArticleAdd = () => {
    popup(applyArticleAdd(createArticlePopup(Article())));
  };

  /**
   * Called upon clicking "delete". The `WorkspaceManager` is called to 
   * iterate over its articles (inside the article container) and remove 
   * every article whose ID can be found in the selection JSON.
   */
  const handleArticleDelete = () => {
    if( selection.getSelectionIds().length > 0 )
    wm.getArticleContainer().removeMany((article) => selection.articles[article.id]);
  };

  return (
    <Form>
      {createButtons([
        {
          key: "article-control-panel-button-add",
          className: "mt-1 me-1",
          onClick: handleArticleAdd,
          caption: lm.translate("control-panels.controls.add")
        },
        {
          key: "article-control-panel-button-delete",
          className: "mt-1 me-1",
          onClick: handleArticleDelete,
          caption: lm.translate("control-panels.controls.delete")
        }
      ])}
    </Form>
  );
}
