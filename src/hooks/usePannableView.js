import { useEffect, useState } from "react";
import DragBox from "../model/components/DragBox";
import addEventListenerTo from "../utils/addEventListenerTo";
import { Point, dividePoint } from "../utils/geometry";
import useDraggables from "./useDraggables";


const dragBox = new DragBox(Point(0, 0), Point(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
dragBox.setAnchorPoint(dividePoint(dragBox.getDimensions(), 2));

export default function usePannableView(props) {
  const defaultPosition = props?.position || Point();
  const defaultZoom = props?.defaultZoom || 1;
  const zoomIncrement = props?.zoomIncrement || 1;

  const [viewPosition, setViewPosition] = useState(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  const [draggedItems] = useDraggables({ dragBoxes: [dragBox] });


  const onDrag = (ctx) => {
    const dbPosition = ctx.dragBox.getPosition();
    
    setViewPosition({
      x: dbPosition.x,
      y: dbPosition.y
    });
  };

  useEffect(() => {
    dragBox.addListener(DragBox.EVENT_DRAG, "drag", onDrag);

    return addEventListenerTo(document, { type: "wheel", listener: zoom });
  }, [viewPosition, zoomLevel]);

  const zoom = (e) => {
    const delta = -Math.sign(e.deltaY) * zoomIncrement;
    setZoomLevel(zoomLevel + delta);
  };

  return {
    viewPosition,
    zoomLevel,
    draggedItems
  };
}
