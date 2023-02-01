import { useEffect, useState } from "react";
import addEventListenerTo from "../utils/addEventListenerTo";

export default function useDrag(props) {
  const onDrag = props?.onDrag || function(ctx) {};
  const [dragStatus, setDragStatus] = useState({ isDragging: false, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    return addEventListenerTo(document, [
      { type: "mousedown", listener: startDragging },
      { type: "mousemove", listener: drag },
      { type: "mouseup", listener: stopDragging },
    ]);
  }, [dragStatus]);

  const startDragging = (e) => {
    setDragStatus({
      isDragging: true,
      mouseX: e.pageX,
      mouseY: e.pageY
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

    onDrag({
      event: e,
      previousState: {
        ...dragStatus
      }
    });

    setDragStatus({
      ...dragStatus,
      mouseX: e.pageX,
      mouseY: e.pageY
    });
  };

  return { dragStatus };
}
