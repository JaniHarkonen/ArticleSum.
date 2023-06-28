import { useEffect, useState } from "react";

import { Point } from "../../utils/geometry";
import addEventListenerTo from "../../utils/addEventListenerTo";


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
