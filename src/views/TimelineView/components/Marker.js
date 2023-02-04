import { distanceBetweenPoints, Point } from "../../../utils/geometry";
import drawMarker from "./drawMarker";


export default class Marker {
  constructor(x = 0, y = 0) {
    this.position = Point(x, y);
    this.radius = 8;
    this.collisionEvent = () => {};
  }

  checkCollision(mousePosition, callback = this.collisionEvent) {
    if( distanceBetweenPoints(this.position, mousePosition) > this.radius )
    return false;

    callback(this);
    return true;
  }

  draw(ctx) {
    drawMarker(ctx, this.position.x, this.position.y, this.radius);
  }

  setPosition(position) {
    this.position = position;
  }

  setRadius(r) {
    this.radius = r;
  }

  setCollisionEvent(event) {
    this.collisionEvent = event;
  }

  getPosition() {
    return this.position;
  }

  getRadius() {
    return this.radius;
  }
}
