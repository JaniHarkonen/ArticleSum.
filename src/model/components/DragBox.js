import { addPoints, constrainPoint, Point, subtractPoints } from "../../utils/geometry";


const combineJsons = (json1, json2) => {
  return { ...json1, ...json2 };
};

export default class DragBox {
  static EVENT_GRAB = "grab";
  static EVENT_DRAG = "drag";
  static EVENT_DROP = "drop";

  constructor(startingPosition = Point(), dimensions = Point()) {
    this.isDragging = false;
    this.position = startingPosition;
    this.dimensions = dimensions;
    this.lastMousePosition = Point();
    this.anchorPoint = Point();
    this.constraints = null;

    this.listeners = {
      grab: [],
      drag: [],
      drop: []
    };
  }

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

  addListener(type, id, listener) {
    this.listeners[type][id] = listener;
  }

  removeListener(type, listenerId) {
    delete this.listeners[type][listenerId];
  }

  setPosition(position) {
    this.position = combineJsons(this.position, position);
  }

  setDimensions(dimensions) {
    this.dimensions = combineJsons(this.dimensions, dimensions);
  }

  setLastMousePosition(mousePosition) {
    this.lastMousePosition = combineJsons(this.lastMousePosition, mousePosition);
  }

  setAnchorPoint(anchorPoint) {
    this.anchorPoint = combineJsons(this.anchorPoint, anchorPoint);
  }

  setConstraints(constraints) {
    this.constraints = constraints;
  }

  getPosition() {
    return this.position;
  }

  getDimensions() {
    return this.dimensions;
  }

  getConstraints() {
    return this.constraints;
  }
}
