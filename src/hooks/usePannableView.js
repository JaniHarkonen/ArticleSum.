import { useEffect, useState } from "react";
import addEventListenerTo from "../utils/addEventListenerTo";

export default function usePannableView(props) {
  const defaultPosition = props?.position || { xOffset: 0, yOffset: 0 };
  const defaultZoom = props?.defaultZoom || 1;
  const zoomIncrement = props?.zoomIncrement || 1;

  const [viewPosition, setViewPosition] = useState(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  const [dragStatus, setDragStatus] = useState({ isDragging: false, dragStartX: 0, dragStartY: 0 });

  useEffect(() => {
    return addEventListenerTo(document, [
      { type: "mousedown", listener: startDragging },
      { type: "mousemove", listener: drag },
      { type: "mouseup", listener: stopDragging },
      { type: "wheel", listener: zoom }
    ]);
  }, [viewPosition, zoomLevel, dragStatus]);

  
  const startDragging = (e) => {
    setDragStatus({
      isDragging: true,
      dragStartX: e.pageX,
      dragStartY: e.pageY
    });
  };

  const stopDragging = () => {
    setDragStatus({
      ...dragStatus,
      isDragging: false
    });
  };

  const drag = (e) => {
    if( dragStatus.isDragging === false )
    return;

    setViewPosition({
      xOffset: viewPosition.xOffset + (e.pageX - dragStatus.dragStartX),
      yOffset: viewPosition.yOffset + (e.pageY - dragStatus.dragStartY)
    });

    setDragStatus({
      ...dragStatus,
      dragStartX: e.pageX,
      dragStartY: e.pageY
    });
  };

  const zoom = (e) => {
    const delta = -Math.sign(e.deltaY) * zoomIncrement;
    setZoomLevel(zoomLevel + delta);
  };

  return {
    viewPosition,
    zoomLevel,
    dragStatus
  };
}
