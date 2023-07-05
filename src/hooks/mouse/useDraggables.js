import { useEffect, useState } from "react";

import { Point } from "../../utils/geometry";
import addEventListenerTo from "../../utils/addEventListenerTo";

/**
 * Custom hook that provides a React-friendly interface for components 
 * seeking to utilize instances of the `DragBox`. This hook attaches 
 * three mouse listeners to the `document` for `grabbing` ("mousedown"),
 * `dragging` ("mousemove") and `dropping` ("mouseup").
 * 
 * When items are dragged the state of this hook is updated along with 
 * the `DragBox`-instances that were affected. The affected instances 
 * are provided to the parent React-component.
 * 
 * @param {JSON} props JSON containing the `dragBoxes` array of the 
 * `DragBox`-instances that are under the direction of this hook.
 * 
 * @returns An array of `DragBox`-instances affected by the grabbing, 
 * dragging and dropping events.
 */
export default function useDraggables(props) {
  /**
   * Array of all the `DragBox`-instances that can be manipulated by 
   * this hook.
   */
  const dragBoxes = props.dragBoxes || [];

  const [draggedItems, setDraggedItems] = useState([]); // DragBoxes that were impacted by the last mouse event

  useEffect(() => {
    return addEventListenerTo(document, [
      { type: "mousedown", listener: grab },
      { type: "mousemove", listener: drag },
      { type: "mouseup"  , listener: drop }
    ]);
  }, []);
  
  /**
   * Mouse listener that grabs items when the mouse is held down.
   * 
   * @param {JSON} e Event-object from the "mousedown"-event.
   */
  const grab = (e) => {
    const mousePosition = Point(e.pageX, e.pageY);
    setDraggedItems(dragBoxes.filter(db => db.grab(mousePosition)));
  };

  /**
   * Mouse listener that drags items when the mouse is moved.
   * 
   * @param {JSON} e Event-object from the "mousemove"-event.
   */
  const drag = (e) => {
    const mousePosition = Point(e.pageX, e.pageY);
    dragBoxes.forEach(db => db.drag(mousePosition));
  };

  /**
   * Mouse listener that drags items when the mouse is released.
   * 
   * @param {JSON} e Event-object from the "mouseup"-event.
   */
  const drop = () => {
    dragBoxes.forEach(db => db.drop());
    setDraggedItems([]);
  };

  return [draggedItems];
}
