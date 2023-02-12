import { useEffect, useState } from "react";
import addEventListenerTo from "../../utils/addEventListenerTo";
import { Point } from "../../utils/geometry";

export default function useDraggables(props) {
  const dragBoxes = props.dragBoxes || [];
  const [draggedItems, setDraggedItems] = useState([]);


  useEffect(() => {
    return addEventListenerTo(document, [
      { type: "mousedown", listener: grab },
      { type: "mousemove", listener: drag },
      { type: "mouseup"  , listener: drop }
    ]);
  }, []);

  
  const grab = (e) => {
    const mousePosition = Point(e.pageX, e.pageY);
    setDraggedItems(dragBoxes.filter(db => db.grab(mousePosition)));
  };

  const drag = (e) => {
    const mousePosition = Point(e.pageX, e.pageY);
    dragBoxes.forEach(db => db.drag(mousePosition));
  };

  const drop = () => {
    dragBoxes.forEach(db => db.drop());
    setDraggedItems([]);
  };

  return [draggedItems];
}
