import useArticleFilterForm from "../../hooks/form/useArticleFilterForm";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import FilterForm from "../../forms/FilterForm/FilterForm";
import { Article } from "../../model/components/Article";
import { filterArticle } from "../../forms/FilterForm/filters";


export default function ArticleFilterForm(props) {
  const filterArticles = props.filterArticles;
  const { workspaceManager: wm } = useContext(GlobalContext);
  const { data, setters } = useArticleFilterForm(Article());

  const handleApplyFilters = () => {
    const tagIds = wm.getTagContainer().mapItems((tag) => {
      if( data.tags.includes(tag.name) )
      return "" + tag.tagId;
    });

    const filters = {
      ...data,
      tags: tagIds
    };

    filterArticles(wm.getArticleContainer().filterItems((article) => filterArticle(article, filters)))
  };

  return (
    <FilterForm
      actions={{
        apply: handleApplyFilters,

      }}
    >
      <ArticleFilters
        data={data}
        setters={setters}
      />
    </FilterForm>
  )
}
