import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";


export default function useLanguageManager(props) {
  const titleKey = props.titleKey;
  const Element = props.Element;
  const elementProps = props.props;
  const { languageManager: lm } = useContext(GlobalContext);

  return (
    <Element
      {...elementProps}
    >
      {lm.translate(titleKey)}
    </Element>
  );
}
