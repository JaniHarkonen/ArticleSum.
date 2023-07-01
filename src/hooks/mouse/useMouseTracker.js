import { useEffect, useState } from "react";

import { Point } from "../../utils/geometry";
import addEventListenerTo from "../../utils/addEventListenerTo";

/**
 * Custom hook that keeps track of the mouse position and updates the 
 * parent React-component each time a mouse move is detected providing 
 * it with a Point JSON that indicates the latest mouse position.
 */
export default function useMouseTracker() {
  const [mousePosition, setMousePosition] = useState(Point());

  useEffect(() => {
    return addEventListenerTo(document, { type: "mousemove", listener: handleMouseMove });
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition(Point(e.pageX, e.pageY));
  };

  return [mousePosition];
}
