import { useEffect } from "react";
import styled from "styled-components";
import usePannableView from "../../../hooks/usePannableView";
import drawMarker from "./drawMarker";
import drawTimeline from "./drawTimeline";

export default function Timeline(props) {
  const cursors = {
    default: "crosshair",
    dragging: "grab"
  };

  const articles = props.articles || [""];
  const canvasId = "timeline-view-timeline-canvas";
  const {viewPosition, zoomLevel, dragStatus} = usePannableView({ zoomIncrement: 0.1 });

  useEffect(() => {
    const c = document.getElementById(canvasId);

      // Set dimensions and position based on the pannableView-hook
    c.style.width = "100%";
    c.style.height = "100%";
    c.style.left = viewPosition.xOffset + "px";
    c.style.top = viewPosition.yOffset + "px";
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

      // Render the timeline view
    const ctx = c.getContext("2d");
    ctx.scale(zoomLevel, zoomLevel);
    renderArticles(ctx, articles);
    renderTimeline(ctx);

      // Toggle mouse cursor when dragging
    if( dragStatus.isDragging === true )
    document.body.style.cursor = cursors.dragging;
    else
    document.body.style.cursor = cursors.default;

  }, [viewPosition, zoomLevel, dragStatus]);


  const renderArticles = (ctx, arrArticles) => {
    for( let article of arrArticles )
    drawMarker(ctx, 16, 16, 8 / zoomLevel);
  };

  const renderTimeline = (ctx) => {
    drawTimeline(ctx, 16, 1800, 16, 8);
  };

  return (
    <DIV>
      <CAN id={canvasId} />
    </DIV>
  );
}

const DIV = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CAN = styled.canvas`
  position: absolute;
`;
