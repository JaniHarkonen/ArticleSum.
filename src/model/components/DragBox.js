import { addPoints, Dimension, Point, subtractPoints } from "../../utils/geometry";

const combineJsons = (json1, json2) => {
  return { ...json1, ...json2 };
};

export default class DragBox {
  static EVENT_GRAB = "grab";
  static EVENT_DRAG = "drag";
  static EVENT_DROP = "drop";

  constructor(startingPosition = Point(), dimensions = Dimension()) {
    this.isDragging = false;
    this.position = startingPosition;
    this.dimensions = dimensions;
    this.lastMousePosition = Point();

    this.listeners = {
      grab: [],
      drag: [],
      drop: []
    };
  }

  grab(mousePosition) {
    const mp = mousePosition;
    const tp = this.position;
    const td = this.dimensions;

    if( mp.x < tp.x || mp.y < tp.y || mp.x > tp.x + td.width || mp.y > tp.y + td.height )
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
    this.setPosition(addPoints(this.position, delta));
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
    this.lastMousePosition = mousePosition;
  }

  getPosition() {
    return this.position;
  }

  getDimensions() {
    return this.dimensions;
  }
}
