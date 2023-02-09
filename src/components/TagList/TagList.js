import { useContext, Fragment } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleTag from "../ArticleTag/ArticleTag";
import FormModal from "../../modal/FormModal/FormModal";
import createTagForm from "../../modal/createTagForm";
import useTagForm from "../../hooks/useTagForm";


export default function TagList() {
  const { popupModal, workspaceManager: ws, languageManager: lm } = useContext(GlobalContext);

  const handleTagEdit = (tag) => {
    const form = createTagForm(tag, lm);
    
    popupModal(
      <FormModal
        title={form.title}
        form={form.form}
        footer={form.footer}
        useForm={useTagForm}
        baseInstance={tag}
      />
    );
  };

  return ws.getTagContainer().mapItems((tag) => {
    return (
      <Fragment key={"tag-list-article-tag" + tag.tagId}>
        <ArticleTag
          name={tag.name}
          color={tag.color}
          onClick={() => handleTagEdit(tag)}
        />
        <br />
      </Fragment>
    );
  });
}
