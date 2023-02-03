import { useEffect, useState } from "react";
import styled from "styled-components";
import useMouseTracker from "../../../hooks/useMouseTracker";
import usePannableView from "../../../hooks/usePannableView";
import createComponentFromSchema from "../../../model/components/createComponentFromSchema";
import addEventListenerTo from "../../../utils/addEventListenerTo";
import ArticlePreview from "./ArticlePreview/ArticlePreview";
import drawCursor from "./drawCursor";
import drawMarker from "./drawMarker";
import drawTimeline from "./drawTimeline";


export default function Timeline(props) {
  const cursors = {
    default: "crosshair",
    dragging: "grabbing"
  };

  const articles = props.articles;
  const timelineOrigin = (new Date(props.origin)).getFullYear() || 0;
  const canvasId = "timeline-view-timeline-canvas";

  const [articlePreview, openArticlePreview] = useState({title: "lol", "publish-date": "1/1/2000"});
  const [mousePosition] = useMouseTracker();
  const {viewPosition, zoomLevel, draggedItems}
  = usePannableView({
    zoomIncrement: 0.01
  });


  useEffect(() => {
    let visibleArticles = articles.filter((a) => {
      const publishYear = (new Date(a["publish-date"])).getFullYear();
      const startYear = timelineOrigin - Math.floor(viewPosition.x / 18);

      return(
        publishYear >= startYear &&
        publishYear <= startYear + (1800 / 18)
      );
    });

      // Set dimensions and position based on the pannableView-hook
    const c = document.getElementById(canvasId);
    c.style.width = "100%";
    c.style.height = "100%";
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

      // Render the timeline view
    const ctx = c.getContext("2d");
    ctx.scale(zoomLevel, zoomLevel);
    renderTimeline(ctx);
    renderArticles(ctx, visibleArticles);
    renderCursor(ctx);

      // Toggle mouse cursor when dragging
    if( draggedItems.length > 0 )
    document.body.style.cursor = cursors.dragging;
    else
    document.body.style.cursor = cursors.default;

  }, [viewPosition, zoomLevel, draggedItems, mousePosition]);


  const renderArticles = (ctx, arrArticles) => {
    for( let article of arrArticles )
    {
      const x = viewPosition.x + 18 * ((new Date(article["publish-date"])).getFullYear() - timelineOrigin);
      drawMarker(ctx, x, 16, 8 / zoomLevel);
    }
  };

  const renderTimeline = (ctx) => {
    drawTimeline(ctx, viewPosition.x, 16, 1800, 18, 2, 
      {
        font: { size: 8 / zoomLevel },
        value: {
          type: "year",
          start: timelineOrigin - Math.floor(viewPosition.x / 18)
        }
      }
    );
  };

  const renderCursor = (ctx) => {
    drawCursor(ctx, mousePosition.x, 0, 128);
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
