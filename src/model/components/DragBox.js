import { addPoints, constrainPoint, Point, subtractPoints } from "../../utils/geometry";

/**
 * Helper function that will combine two JSONs via the spread 
 * operator (...).
 * 
 * @param {JSON} json1 JSON to append to.
 * @param {JSON} json2 JSON to append.
 * 
 * @returns A new JSON which combines the two given JSONs.
 */
const combineJsons = (json1, json2) => {
  return { ...json1, ...json2 };
};

/**
 * `DragBox` represents a draggable non-rotating rectangle. Instances 
 * of this class can be used whenever a model is needed for a for a 
 * draggable 2D-object, such as a `<div>`-element or a view.
 * 
 * A `DragBox` has three states which are all provided as static 
 * in the class:
 * - `DragBox.EVENT_GRAB` which is when the dragging starts (for example,
 * when left-mouse button is pressed)
 * - `DragBox.EVENT_DRAG` which is the action of being dragged
 * - `DragBox.EVENT_DORP` which is when the dragging ends (for example, 
 * when the left-mouse button is released)
 * 
 * These states can be entered via the `grab`-, `drag`- and `drop`-methods.
 * A listener may be attached to each of these states (events) that will 
 * be fired when the state is entered. When the listener is fired, the 
 * `DragBox` will call the function and pass it a JSON that contains the 
 * new state as well as a reference to the `DragBox`-instance. The instance 
 * can then be polled by another software component.
 */
export default class DragBox {
  /**
   * A `DragBox` has begun dragging.
   */
  static EVENT_GRAB = "grab";

  /**
   * A `DragBox` has been dragged from one position to another.
   */
  static EVENT_DRAG = "drag";

  /**
   * A `DragBox` has been dropped, and thus, is no longer being dragged.
   */
  static EVENT_DROP = "drop";

  /**
   * Constructs a `DragBox`-instance with the default settings. A starting 
   * position as well as the dimensions may be provided as Point-type JSONs 
   * (see `geometry`-utility module for more information).
   * 
   * @param {JSON} startingPosition Optional, a point JSON representing the 
   * initial x- and y-coordinates of the `DragBox`.
   * @param {JSON} dimensions Optional, a point JSON representing the 
   * initial width and height dimensions of the `DragBox`.
   */
  constructor(startingPosition = Point(), dimensions = Point()) {
    /**
     * Whether the `DragBox` is being dragged.
     */
    this.isDragging = false;

    /**
     * Current x- and y-coordinates of the `DragBox` represented as a 
     * point-type JSON.
     */
    this.position = startingPosition;

    /**
     * Current width and height of the `DragBox` represented as a point-type 
     * JSON.
     */
    this.dimensions = dimensions;

    /**
     * The last position of the mouse (or another entity performing the 
     * dragging) represented as a point-type JSON.
     */
    this.lastMousePosition = Point();

    /**
     * The anchor point of the dragging on the `DragBox` (the relative 
     * position of the mouse to the `DragBox` when the dragging last 
     * started).
     */
    this.anchorPoint = Point();

    /**
     * Limits that the `DragBox` can be dragged to represetend as a 
     * constraints-type JSON (see `geometry`-utility module for more 
     * information on constraints). The constraints do not have to 
     * contain the all the limits.
     */
    this.constraints = null;

    /**
     * The listeners grouped by the states that they are tied to. Each 
     * state can have multiple listeners, thus, they are grouped into 
     * arrays.
     */
    this.listeners = {
      grab: [],
      drag: [],
      drop: []
    };
  }

  /**
   * Begins dragging the `DragBox` if the given mouse position is 
   * on the `DragBox`. The anchor point of the dragging will also be
   * determined to avoid snapping to pointer coordinates while being 
   * dragged.
   * 
   * Notifies the `grab`-listeners.
   * 
   * @param {JSON} mousePosition The current position of the mouse (
   * or another entity that is dragging the `DragBox`) represented as 
   * a point JSON.
   * 
   * @returns Whether the `DragBox` could be grabbed.
   */
  grab(mousePosition) {
    const mp = mousePosition;
    const topLeft = subtractPoints(this.position, this.anchorPoint);
    const bottomRight = addPoints(topLeft, this.dimensions);

    if( mp.x < topLeft.x || mp.y < topLeft.y || mp.x > bottomRight.x || mp.y > bottomRight.y )
    return false;

    this.isDragging = true;
    this.lastMousePosition = mp;

      // Notify GRAB-listeners
    const arrListeners = this.listeners.grab;
    for( let grabListener in arrListeners )
    {
      arrListeners[grabListener]({
        type: DragBox.EVENT_GRAB,
        dragBox: this,
        isDragging: this.isDragging,
        mousePosition: mousePosition
      });
    }

    return true;
  }

  /**
   * Drags the `DragBox` according to the given mouse position. A 
   * delta between the anchor point of the dragging and the mouse 
   * position will be calculated and the `DragBox` will be shifted 
   * by the amount of the delta.
   * 
   * The `DragBox` will also be constrained within its limits if there
   * are any.
   * 
   * Notifies the `drag`-listeners.
   * 
   * @param {JSON} mousePosition The current position of the mouse (
   * or another entity that is dragging the `DragBox`) represented as 
   * a point JSON.
   */
  drag(mousePosition) {
    if( !this.isDragging )
    return;

    const delta = subtractPoints(mousePosition, this.lastMousePosition);
    this.setPosition(constrainPoint(addPoints(this.position, delta), this.constraints));
    this.setLastMousePosition(mousePosition);

      // Notify DRAG-listeners
    const arrListeners = this.listeners.drag;
    for( let dragListener in arrListeners )
    {
      arrListeners[dragListener]({
        type: DragBox.EVENT_DRAG,
        dragBox: this,
        mousePosition: mousePosition,
        mouseDelta: delta
      });
    }
  }

  /**
   * Stops dragging the `DragBox`.
   * 
   * Notifies the `drop`-listeners.
   */
  drop() {
    if( !this.isDragging )
    return;
    
    this.isDragging = false;

      // Notify DROP-listeners
    const arrListeners = this.listeners.drop;
    for( let dropListener in arrListeners )
    {
      arrListeners[dropListener]({
        type: DragBox.EVENT_DROP,
        dragBox: this
      });
    }
  }

  /**
   * Adds a given listener function to the `DragBox`. The listener 
   * will be assigned to the given state indicated by `type` and 
   * will be assigned the given identifier `id` which can later be 
   * used to remove the listener.
   * 
   * Multiple listeners of the same identifier cannot exist.
   * 
   * @param {String} type The state that the listener is to be 
   * tied to.
   * @param {String} id Identifier of the listener used to identify 
   * the listener later.
   * @param {Function} listener The listener function that will be 
   * triggered when the state is entered.
   */
  addListener(type, id, listener) {
    this.listeners[type][id] = listener;
  }

  /**
   * Removes a listener with the given identifier from the given 
   * state. 
   * 
   * @param {String} type The state that the listener is to be 
   * removed from.
   * @param {String} listenerId The identifier of the listener 
   * to be removed.
   */
  removeListener(type, listenerId) {
    delete this.listeners[type][listenerId];
  }

  /**
   * Sets the current x- and y-coordinate of the `DragBox`.
   * 
   * @param {JSON} position The new position represented as a 
   * point JSON.
   */
  setPosition(position) {
    this.position = combineJsons(this.position, position);
  }

  /**
   * Sets the current width and height of the `DragBox`.
   * 
   * @param {JSON} dimensions The new dimensions represented 
   * as a point JSON.
   */
  setDimensions(dimensions) {
    this.dimensions = combineJsons(this.dimensions, dimensions);
  }

  /**
   * Sets the last mouse x- and y-coordinates that will be used to 
   * calculate the delta between the `DragBox` and the mouse when
   * dragging.
   * 
   * @param {JSON} mousePosition The mouse position represented as 
   * a point JSON.
   */
  setLastMousePosition(mousePosition) {
    this.lastMousePosition = combineJsons(this.lastMousePosition, mousePosition);
  }

  /**
   * Sets the x- and y-coordinates of the anchor point of the dragging.
   * 
   * @param {JSON} anchorPoint The new anchor point position represented 
   * as a point JSON.
   */
  setAnchorPoint(anchorPoint) {
    this.anchorPoint = combineJsons(this.anchorPoint, anchorPoint);
  }

  /**
   * Sets the limitations for the x- and y-coordinates of the `DragBox`.
   * 
   * @param {JSON} constraints The new constraints represented as a 
   * constraint JSON.
   */
  setConstraints(constraints) {
    this.constraints = constraints;
  }

  /**
   * Returns a reference to the point JSON that contains the x- 
   * and y-coordinates of the `DragBox`.
   * 
   * @returns Reference to the position point.
   */
  getPosition() {
    return this.position;
  }

  /**
   * Returns a reference to the point JSON that contains the width 
   * and height of the `DragBox`.
   * 
   * @returns Reference to the dimensions point.
   */
  getDimensions() {
    return this.dimensions;
  }

  /**
   * Returns a reference to the constraint JSON that contains the 
   * left, right, top and bottom limits for the x- and y-coordinates 
   * of the `DragBox`.
   * 
   * @returns Reference to the constraints.
   */
  getConstraints() {
    return this.constraints;
  }
}
