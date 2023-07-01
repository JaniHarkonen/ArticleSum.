import { useEffect } from "react";

import addEventListenerTo from "../utils/addEventListenerTo";

/**
 * Custom hook that executes a given function when the application 
 * window is resized. The `effect` is executed the first time the 
 * React-component is rendered and attaches the `effect` to the 
 * `window` using the `addEventListenerTo`-utility function. When 
 * the React-component is dismounted, the event listener is removed.
 * 
 * @param {Function} effect Function that is to be executed when the 
 * application window resizes.
 */
export default function useResizeEffect(effect) {
  useEffect(() => {
    effect();
    
    return addEventListenerTo(window, {
      type: "resize",
      listener: effect
    });
  }, []);
}
