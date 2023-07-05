/**
 * This utility module holds all geometry utility functions.
 */

/**
 * Creates a JSON representing a 2D-point with an x- and y-
 * coordinates.
 * 
 * @param {Number} x X-coordinate of the point (default: 0).
 * @param {Number} y Y-coordinate of the point (default: 0).
 * 
 * @returns A JSON representing a 2D-point.
 */
export const Point = (x = 0, y = 0) => {
  return { x: x, y: y };
};

/**
 * Constructs a new point by copying the coordinates of a 
 * given point.
 * 
 * @param {JSON} p JSON of the point that is to be copied.
 * 
 * @returns A new JSON that is a copy of the `p`-point.
 */
export const copyPoint = (p) => {
  return Point(p.x, p.y);
};

/**
 * Performs an addition on two points by adding their 
 * x- and y-coordinates together. The result will be a 
 * new point.
 * 
 * @param {JSON} p1 First point.
 * @param {JSON} p2 Second point.
 * 
 * @returns A new point based on the addition of the 
 * `p1` and `p2` points.
 */
export const addPoints = (p1, p2) => {
  const p = copyPoint(p1);
  p.x += p2.x;
  p.y += p2.y;
  return p;
};

/**
 * Performs a subtraction on two points by subtracting 
 * `p2` from the x- and y-coordinates of `p1`. The result 
 * will be a new point.
 * 
 * @param {JSON} p1 Point to subtract from.
 * @param {JSON} p2 Point to subtract.
 * 
 * @returns A new point based on the subtraction of `p2`
 * from `p1`.
 */
export const subtractPoints = (p1, p2) => {
  const p = copyPoint(p1);
  p.x -= p2.x;
  p.y -= p2.y;
  return p;
};

/**
 * Divides the x- and y-coordinates of a point by a given 
 * divisor. The result will be a new point.
 * 
 * @param {JSON} p1 Point whose coordinates to divide.
 * @param {Number} divisor Value by which to divide.
 * 
 * @returns A new point based on the division of `p1` 
 * coordinates by `divisor`.
 */
export const dividePoint = (p1, divisor) => {
  const p = copyPoint(p1);
  p.x /= divisor;
  p.y /= divisor;
  return p;
};

/**
 * Calculates the hypothenuse of a right triangle given 
 * its two sides using Pythagora's theorem.
 * 
 * @param {Number} a First side.
 * @param {Number} b Second side.
 * 
 * @returns The hypothenuse.
 */
export const pythagoras = (a, b) => {
  return Math.sqrt(a*a + b*b);
};

/**
 * Calculates the distance between two points.
 * 
 * @param {JSON} p1 First point.
 * @param {JSON} p2 Second point.
 * 
 * @returns Distance between `p1` and `p2`.
 */
export const distanceBetweenPoints = (p1, p2) => {
  const p = subtractPoints(p1, p2);
  return pythagoras(p.x, p.y);
};

/**
 * Constrains a point to be within given constraints. The 
 * constraints are provided as a JSON which can have 
 * `left`, `right`, `top` and `bottom` limitations, however, 
 * not all of the limitations are required. The result is a 
 * new point constrained within the given limitations.
 * 
 * @param {JSON} p1 Point that is to be constrained.
 * @param {JSON} constraints JSON representing the constraints 
 * that the point is to be limited within.
 * 
 * @returns A new point limited within the given constraints.
 */
export const constrainPoint = (p1, constraints) => {
  const p = copyPoint(p1);
  
  if( !constraints )
  return p;

    // Apply horizontal constraints
  if( typeof constraints.left == "number" && p.x < constraints.left )
  p.x = constraints.left;
  else if( typeof constraints.right == "number" && p.x > constraints.right )
  p.x = constraints.right;

    // Apply vertical constraints
  if( typeof constraints.top == "number" && p.y < constraints.top )
  p.y = constraints.top;
  else if( typeof constraints.bottom == "number" && p.y > constraints.bottom )
  p.y = constraints.bottom;

  return p;
};
