import { useEffect, useState } from "react";
import DragBox from "../../model/components/DragBox";
import addEventListenerTo from "../../utils/addEventListenerTo";
import { Point, dividePoint } from "../../utils/geometry";
import useDraggables from "./useDraggables";


export const DEFAULT_SETTINGS = {
  defaultPosition: Point(),
  defaultZoom: 1,
  zoomIncrement: 1,
};

const dragBox = new DragBox(Point(0, 0), Point(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
dragBox.setAnchorPoint(dividePoint(dragBox.getDimensions(), 2));

export default function usePannableView(props) {
  const defaultPosition = props?.position || DEFAULT_SETTINGS.defaultPosition;
  const defaultZoom = props?.defaultZoom || DEFAULT_SETTINGS.defaultZoom;
  const zoomIncrement = props?.zoomIncrement || DEFAULT_SETTINGS.zoomIncrement;
  const initialConstraints = props?.initialConstraints;

  const [constraints, setConstraints] = useState(initialConstraints);
  const [viewPosition, setViewPosition] = useState(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  dragBox.setConstraints(constraints);
  const [draggedItems] = useDraggables({ dragBoxes: [dragBox] });


  useEffect(() => {
    if( defaultPosition )
    dragBox.setPosition(defaultPosition);
    else
    dragBox.setPosition(Point(0, 0));
  }, []);

  useEffect(() => {
    dragBox.addListener(DragBox.EVENT_DRAG, "drag", onDrag);

    return addEventListenerTo(document, { type: "wheel", listener: zoom });
  }, [viewPosition, zoomLevel]);

  const onDrag = (ctx) => {
    const dbPosition = ctx.dragBox.getPosition();
    
    setViewPosition({
      x: dbPosition.x,
      y: dbPosition.y
    });
  };

  const zoom = (e) => {
    const delta = -Math.sign(e.deltaY) * zoomIncrement;
    setZoomLevel(zoomLevel + delta);
  };

  const moveView = (position) => {
    dragBox.setPosition(position);
    setViewPosition(position);
  };

  return {
    viewPosition,
    zoomLevel,
    draggedItems,
    setConstraints,
    moveView,
    zoom
  };
}
