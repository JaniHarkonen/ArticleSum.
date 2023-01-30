import { useEffect, useState } from "react";
import usePannableView from "../../hooks/usePannableView";

export default function TimelineView() {
  const canvasId = "timeline-view-timeline-canvas";
  const view = usePannableView();

  useEffect(() => {
    const c = document.getElementById(canvasId);
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(view.viewPosition.x, view.viewPosition.y);
    ctx.lineTo(200 - view.viewPosition.x, view.viewPosition.y);
    ctx.strokeStyle = "black";
    ctx.stroke();

  }, [view.viewPosition, view.viewDimensions]);

  return (
    <canvas
      id={canvasId}
      width={view.viewDimensions.width}
      height={view.viewDimensions.height}
      style={{ border: "solid", borderWidth: "1px" }}
    />
  );
}
