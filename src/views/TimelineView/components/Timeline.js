import { useEffect, useState } from "react";
import styled from "styled-components";
import usePannableView from "../../../hooks/usePannableView";
import addEventListenerTo from "../../../utils/addEventListenerTo";
import ArticlePreview from "./ArticlePreview/ArticlePreview";
import drawMarker from "./drawMarker";
import drawTimeline from "./drawTimeline";


export default function Timeline(props) {
  const cursors = {
    default: "crosshair",
    dragging: "grabbing"
  };

  const getArticles = props.getArticles;
  const articles = getArticles() || [""];
  const canvasId = "timeline-view-timeline-canvas";

  const [articlePreview, openArticlePreview] = useState({title: "lol", "publish-date": "1/1/2000"});
  const {viewPosition, zoomLevel, isDragging} = usePannableView({ zoomIncrement: 0.1 });


  useEffect(() => {
    const c = document.getElementById(canvasId);

      // Set dimensions and position based on the pannableView-hook
    c.style.width = "100%";
    c.style.height = "100%";
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

      // Render the timeline view
    const ctx = c.getContext("2d");
    ctx.scale(zoomLevel, zoomLevel);
    renderTimeline(ctx);
    renderArticles(ctx, articles);

      // Toggle mouse cursor when dragging
    if( isDragging === true )
    document.body.style.cursor = cursors.dragging;
    else
    document.body.style.cursor = cursors.default;

  }, [viewPosition, zoomLevel, isDragging]);


  const renderArticles = (ctx, arrArticles) => {
    for( let article of arrArticles )
    {
      const x = viewPosition.xOffset + 18 * (parseInt(article["publish-date"].split("/")[2]) - 2000);

      if( x >= 0 )
      drawMarker(ctx, x, 16, 8 / zoomLevel);
    }
  };

  const renderTimeline = (ctx) => {
    drawTimeline(ctx, viewPosition.xOffset, 16, 1800, 18, 2, 
    {
      font: { size: 8 / zoomLevel },
      value: {
        type: "year",
        start: 2000 + Math.floor(Math.abs(viewPosition.xOffset / 18))
      }
    });
  };

  return (
    <DIV>
      <CAN id={canvasId} />
      {/*
        articlePreview &&
        <ArticlePreview
          article={articlePreview}
          onClick={() => openArticlePreview(null)}
        />
  */}
    </DIV>
  );
}

const DIV = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CAN = styled.canvas`
  position: absolute;
`;
