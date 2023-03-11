import { useEffect, useState } from "react";
import styled from "styled-components";
import useMouseTracker from "../../../hooks/mouse/useMouseTracker";
import usePannableView from "../../../hooks/mouse/usePannableView";
import ArticlePreview from "../../../components/ArticlePreview/ArticlePreview";
import drawCursor from "./draw/drawCursor";
import drawTimeline from "./draw/drawTimeline";
import Marker from "./Marker";


export default function Timeline(props) {
  const cursors = {
    default: "crosshair",
    dragging: "grabbing"
  };

  const articles = props.articles;
  const timelineOrigin = (new Date(props.origin)).getFullYear() || 0;
  const canvasId = "timeline-view-timeline-canvas";

  const [articlePreview, openArticlePreview] = useState({ article: {title: "lol", "publish-date": "date"}, marker: new Marker(), isMouseOver: false });
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [isMouseOver, setMouseOver] = useState(false);
  const [mousePosition] = useMouseTracker();
  const {viewPosition, zoomLevel, draggedItems}
  = usePannableView({
    zoomIncrement: 0.01
  });

  useEffect(() => {
      // Determine which articles are visible by comparing their timestamp
      // to the edges of the viewport
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

      // Show article preview if the cursor is howering a marker
    let collidedWithMouse = false;
    const cursorPosition = { ...mousePosition, y: 16 };
    for( let marker of visibleMarkers )
    {
      if( marker.checkCollision(cursorPosition) )
      {
        collidedWithMouse = true;
        break;
      }
    }

    if( articlePreview && !articlePreview.isMouseOver && !collidedWithMouse )
    openArticlePreview(null);

      // Toggle mouse cursor when dragging
    if( draggedItems.length > 0 )
    document.body.style.cursor = cursors.dragging;
    else
    document.body.style.cursor = cursors.default;

  }, [viewPosition, zoomLevel, draggedItems, mousePosition]);


  const renderArticles = (ctx, arrArticles) => {
    const markers = [];
    for( let article of arrArticles )
    {
      const x = viewPosition.x + 18 * ((new Date(article["publish-date"])).getFullYear() - timelineOrigin);

      let marker = new Marker(x, 16);
      marker.setRadius(8 / zoomLevel);
      marker.draw(ctx);
      marker.setCollisionEvent(() => {
        if( isMouseOver )
        {
          openArticlePreview({
            ...articlePreview,
            article: article,
            marker: marker
          });
        }
      });
      markers.push(marker);
    }

    setVisibleMarkers(markers);
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
    if( isMouseOver )
    drawCursor(ctx, mousePosition.x, 0, 128);
  };

  return (
    <DIV
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <CAN id={canvasId} />
      {
        articlePreview &&
        <ArticlePreview
          arrowX={articlePreview.marker.getPosition().x}
          article={articlePreview.article}
          onClick={() => openArticlePreview(null)}
          onMouseOver={() => openArticlePreview({ ...articlePreview, isMouseOver: true })}
          onMouseLeave={() => openArticlePreview({ ...articlePreview, isMouseOver: false })}
        />
      }
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
