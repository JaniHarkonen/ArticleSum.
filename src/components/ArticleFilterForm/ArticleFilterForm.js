import { useContext } from "react";

import useArticleForm from "../../hooks/form/useArticleForm";
import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import FilterForm from "../../forms/FilterForm/FilterForm";
import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import { filterArticle, parseFilter, parseFilterString } from "../../forms/FilterForm/filters";


export default function ArticleFilterForm(props) {
  const filterArticles = props.filterArticles;
  const { workspaceManager: wm } = useContext(GlobalContext);
  const {data, setters} = useArticleForm(Article());

  const handleApplyFilters = () => {
    const tagIds = wm.getTagContainer().mapItems((tag) => {
      if( data.tags.includes(tag.name) )
      return "" + tag.tagId;
    });

    const filters = {
      ...data,
      tags: tagIds
    };

    const parsedFilters = parseFilter(filters);
    filterArticles(wm.getArticleContainer().filterItems((article) => filterArticle(article, parsedFilters)));
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
