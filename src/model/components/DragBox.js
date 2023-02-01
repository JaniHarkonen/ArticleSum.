const combineJsons = (json1, json2) => {
  return { ...json1, ...json2 };
};

export default class DragBox {
  constructor() {
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.positionStart = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.dimensions = { width: 0, height: 0 };
  }

  grab(mousePosition) {
    const mp = mousePosition;
    const tp = this.position;
    const td = this.dimensions;

    if( mp.x < tp.x || mp.y < tp.y || mp.x > tp.x + td.width || mp.y > tp.y + td.height )
    return false;

    this.isDragging = true;
    this.dragOffset = { x: tp.x - mp.x, y: tp.y - mp.y };

    return true;
  }

  drag(mousePosition) {
    this.setPosition(this.dragOffset + mousePosition);
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

  getPosition() {
    return this.position;
  }

  getDimensions() {
    return this.dimensions;
  }
}
