import { useEffect } from "react";

import addEventListenerTo from "../utils/addEventListenerTo";


export default function useResizeEffect(effect) {
  useEffect(() => {
    effect();
    
    return addEventListenerTo(window, {
      type: "resize",
      listener: effect
    });
  }, []);
}
