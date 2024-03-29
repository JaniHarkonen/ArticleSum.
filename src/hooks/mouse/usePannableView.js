import { useEffect, useState } from "react";

import DragBox from "../../model/components/DragBox";

import { Point, dividePoint } from "../../utils/geometry";
import addEventListenerTo from "../../utils/addEventListenerTo";
import useDraggables from "./useDraggables";

export const DEFAULT_SETTINGS = {
  defaultPosition: Point(),
  defaultZoom: 1,
  zoomIncrement: 1,
};

/**
 * The `DragBox`-instance that will be used to represent the pannable view.
 */
const dragBox = new DragBox(Point(0, 0), Point(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
dragBox.setAnchorPoint(dividePoint(dragBox.getDimensions(), 2));

/**
 * Custom hook that provides the React-component with a pannable view 
 * functionality. This is done by creating a `DragBox`-instance which 
 * functions as the view, that the user can then drag around via the 
 * mouse. This is used, for example, in the `TimelineView` to keep 
 * track of the timeline.
 * 
 * This hook supports zooming as well via the `zoom`-hook. When the 
 * components are moved, all the coordinates are scaled using the 
 * zoom-factor. The `zoom`-hook takes an event-object generated by a 
 * mouse event and uses it to extract the scroll wheel movement. The
 * scroll delta will be used to adjust the zoom-factor.
 * 
 * The following values and hooks will be returned by this hook:
 * - `viewPosition`, a point JSON indicating the current position of 
 * the view
 * - `zoomLevel`, the current zoom-factor that will be used to 
 * scale coordinates when zooming is required
 * - `draggedItems`, an array that contains the `DragBox`-instance of 
 * the view if the previous mouse action affected it
 * - `setConstraints`, hook that imposes constraints on the DragBox-
 * instance of the view
 * - `moveView`, hook that can be used to force the view to move to a
 * given x- and y-coordinates provided as a point JSON
 * - zoom, hook that adjusts the zoom factor
 */
export default function usePannableView(props) {
  /**
   * Starting zoom-factor.
   */
  const defaultZoom = props?.defaultZoom || DEFAULT_SETTINGS.defaultZoom;

  /**
   * Amount by which a single mouse scroll wheel tick will increment/
   * decrement the zoom-factor.
   */
  const zoomIncrement = props?.zoomIncrement || DEFAULT_SETTINGS.zoomIncrement;

  /**
   * The initial constraints for the view represented as a constraint
   * JSON (see `geometry`-utility module for more information on 
   * constraint JSONs).
   */
  const initialConstraints = props?.initialConstraints;

  const [constraints, setConstraints] = useState(initialConstraints);
  const [viewPosition, setViewPosition] = useState(Point(0, 0));
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  dragBox.setConstraints(constraints);
  const [draggedItems] = useDraggables({ dragBoxes: [dragBox] });

  useEffect(() => {
    dragBox.addListener(DragBox.EVENT_DRAG, "drag", onDrag);

    return addEventListenerTo(document, { type: "wheel", listener: zoom });
  }, [viewPosition, zoomLevel]);

  /**
   * Drag listener that is added to the `DragBox` of the view 
   * that fires each time the view is moved.
   * 
   * @param {JSON} ctx The context JSON provided by the `DragBox.drag`-
   * method.
   */
  const onDrag = (ctx) => {
    const dbPosition = ctx.dragBox.getPosition();
    
    setViewPosition({
      x: dbPosition.x,
      y: dbPosition.y
    });
  };

  /**
   * Listener that tracks the mouse wheel movements and adjusts the 
   * zoom-factor by the scroll delta.
   * 
   * @param {JSON} e Event-object from the "wheel"-mouse event that 
   * contains the scroll wheel delta.
   */
  const zoom = (e) => {
    const delta = -Math.sign(e.deltaY) * zoomIncrement;
    setZoomLevel(zoomLevel + delta);
  };

  /**
   * Forces the view `DragBox` to move to a given x- and y-coordinates.
   * 
   * @param {JSON} position The new position of the `DragBox` of the 
   * view represented as a point JSON.
   */
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
