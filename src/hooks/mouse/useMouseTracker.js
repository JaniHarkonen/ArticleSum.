import { useEffect, useState } from "react";
import addEventListenerTo from "../../utils/addEventListenerTo";
import { Point } from "../../utils/geometry";


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
