import { useContext } from "react";

import ArticleFilters from "../../forms/FilterForm/ArticleFilterForm/ArticleFilters";
import FilterForm from "../../forms/FilterForm/FilterForm";

import { GlobalContext } from "../../context/GlobalContext";
import { Article } from "../../model/components/Article";
import { filterArticle, parseFilter } from "../../forms/FilterForm/filters";
import useArticleForm from "../../hooks/form/useArticleForm";

/**
 * A wrapper React-component that displays the article filteration 
 * form (`ArticleFilters`) by wrapping it inside the `FilterForm`-
 * component. This component also manages the form state by 
 * utilizing the `useArticleForm`-hook which provides the data 
 * and the setters for an article form.
 * 
 * Because the filteration is carried out using the `filters.js`-
 * module, the user can build rather complex filter criteria (see
 * `filters.js` for more information).
 */
export default function ArticleFilterForm(props) {
  /**
   * Hook that is used to update the parent component's articles 
   * upon applying filters.
   */
  const filterArticles = props.filterArticles;
  const { workspaceManager: wm } = useContext(GlobalContext);
  const { data, setters } = useArticleForm(Article());

  /**
   * Called upon clicking "apply". First, the IDs of the tags in 
   * the "tags"-section of the filter are resolved by querying the 
   * tag container of the `WorkspaceManager`. Next, the filters 
   * are pre-parsed, so that they don't need to be parsed each 
   * iteration. Finally, the articles of the `WorkspaceManager` 
   * are filtered using the parsed filters and passed onto the 
   * parent component via the `filterArticles`-hook.
   */
  const handleApplyFilters = () => {

      // Resolve tag IDs
    const tagIds = wm.getTagContainer().mapItems((tag) => {
      if( data.tags.includes(tag.name) )
      return "" + tag.tagId;
    });

    const filters = {
      ...data,
      tags: tagIds
    };

      // Parse filters and filter articles
    const parsedFilters = parseFilter(filters);
    filterArticles(wm.getArticleContainer().filterItems((article) => filterArticle(article, parsedFilters)));
  };

  const handleClearFilters = () => {
    filterArticles(wm.getArticleContainer().filterItems());
  };

  return (
    <FilterForm
      actions={{
        apply: handleApplyFilters,
        clear: handleClearFilters
      }}
    >
      <ArticleFilters
        data={data}
        setters={setters}
      />
    </FilterForm>
  )
}
