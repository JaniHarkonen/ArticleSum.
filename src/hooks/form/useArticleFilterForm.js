import useArticleForm from "./useArticleForm";


export default function useArticleFilterForm(props) {
  const {data, setters} = useArticleForm(props);

  return {data, setters};
}
