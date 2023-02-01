import { useEffect, useState } from "react";
import addEventListenerTo from "../utils/addEventListenerTo";
import { Point } from "../utils/geometry";

export default function useDraggables(props) {
  const dragBoxes = props.dragBoxes || [];
  const [isDragging, setDragging] = useState(false);


  useEffect(() => {
    return addEventListenerTo(document, [
      { type: "mousedown", listener: grab },
      { type: "mousemove", listener: drag },
      { type: "mouseup"  , listener: drop }
    ]);
  }, []);

  
  const grab = (e) => {
    const mousePosition = Point(e.pageX, e.pageY);
    dragBoxes.forEach(db => db.grab(mousePosition));
    setDragging(true);
  };

  const drag = (e) => {
    const mousePosition = Point(e.pageX, e.pageY);
    dragBoxes.forEach(db => db.drag(mousePosition));
  };

  const drop = () => {
    dragBoxes.forEach(db => db.drop());
    setDragging(false);
  };

  return [isDragging];
}
