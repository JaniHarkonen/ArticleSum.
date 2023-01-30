import { useEffect, useState } from "react";
import addEventListenerTo from "../utils/addEventListenerTo";

export default function usePannableView(props) {
  const defaultPosition = props?.position || { width: 0, height: 0 };
  const defaultDimensions = props?.dimensions || { x: 200, y: 200 };

  const [viewPosition, setViewPosition] = useState(defaultPosition);
  const [viewDimensions, setViewDimensions] = useState(defaultDimensions);
  const [isDragging, setDragging] = useState(false);

  useEffect(() => {
    return addEventListenerTo(document, [
      { type: "mousedown", listener: startDragging },
      { type: "mousemove", listener: drag },
      { type: "mouseup", listener: stopDragging },
      { type: "wheel", listener: zoom }
    ]);
  }, [viewPosition, viewDimensions, isDragging]);

  
  const startDragging = () => {
    setDragging(true);
  };

  const drag = (e) => {
    if( isDragging )
    setViewPosition({ x: e.pageX, y: e.pageY });
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const zoom = (e) => {
    
  };

  return {
    viewPosition,
    viewDimensions,
    isDragging
  };
}
