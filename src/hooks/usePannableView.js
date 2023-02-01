import { useEffect, useState } from "react";
import addEventListenerTo from "../utils/addEventListenerTo";
import useDrag from "./useDrag";

export default function usePannableView(props) {
  const defaultPosition = props?.position || { xOffset: 0, yOffset: 0 };
  const defaultZoom = props?.defaultZoom || 1;
  const zoomIncrement = props?.zoomIncrement || 1;

  const [viewPosition, setViewPosition] = useState(defaultPosition);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  
  const onDrag = (ctx) => {
    const { event: e } = ctx;
    const { mouseX, mouseY } = ctx.previousState;

    setViewPosition({
      xOffset: viewPosition.xOffset + (e.pageX - mouseX),
      yOffset: viewPosition.yOffset + (e.pageY - mouseY)
    });
  };

  const { dragStatus } = useDrag({ onDrag: onDrag });


  useEffect(() => {
    return addEventListenerTo(document, { type: "wheel", listener: zoom });
  }, [viewPosition, zoomLevel, dragStatus]);

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
