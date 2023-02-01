import { addPoints, Dimension, Point, subtractPoints } from "../../utils/geometry";

const combineJsons = (json1, json2) => {
  return { ...json1, ...json2 };
};

export default class DragBox {
  constructor() {
    this.isDragging = false;
    this.position = Point();
    this.dimensions = Dimension();
    this.lastMousePosition = Point();
  }

  grab(mousePosition) {
    const mp = mousePosition;
    const tp = this.position;
    const td = this.dimensions;

    if( mp.x < tp.x || mp.y < tp.y || mp.x > tp.x + td.width || mp.y > tp.y + td.height )
    return false;

    this.isDragging = true;
    this.lastMousePosition = mp;

    return true;
  }

  drag(mousePosition) {
    if( !this.isDragging )
    return;

    const delta = subtractPoints(mousePosition, this.lastMousePosition);
    this.setPosition(addPoints(this.position + delta));
    this.setLastMousePosition(mousePosition);
  }

  drop() {
    this.isDragging = false;
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
