import { useEffect, useState } from "react";
import DragBox from "../model/components/DragBox";
import addEventListenerTo from "../utils/addEventListenerTo";
import { Dimension, Point } from "../utils/geometry";
import useDraggables from "./useDraggables";

const dragBox = new DragBox(Point(-2500, -2500), Dimension(5000, 5000));

export default function usePannableView(props) {
  const defaultPosition = props?.position || { xOffset: 0, yOffset: 0 };
  const defaultZoom = props?.defaultZoom || 1;
  const zoomIncrement = props?.zoomIncrement || 1;

  const [viewPosition, setViewPosition] = useState(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  const [isDragging] = useDraggables({ dragBoxes: [dragBox] });


  const onDrag = (ctx) => {
    setViewPosition({
      xOffset: viewPosition.xOffset + ctx.mouseDelta.x,
      yOffset: viewPosition.yOffset + ctx.mouseDelta.y
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
    isDragging
  };
}
