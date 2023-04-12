export const Point = (x = 0, y = 0) => {
  return { x: x, y: y };
};

export const copyPoint = (p) => {
  return Point(p.x, p.y);
};

export const addPoints = (p1, p2) => {
  const p = copyPoint(p1);
  p.x += p2.x;
  p.y += p2.y;
  return p;
};

export const subtractPoints = (p1, p2) => {
  const p = copyPoint(p1);
  p.x -= p2.x;
  p.y -= p2.y;
  return p;
};

export const dividePoint = (p1, divisor) => {
  const p = copyPoint(p1);
  p.x /= divisor;
  p.y /= divisor;
  return p;
};

export const pythagoras = (a, b) => {
  return Math.sqrt(a*a + b*b);
};

export const distanceBetweenPoints = (p1, p2) => {
  const p = subtractPoints(p1, p2);
  return pythagoras(p.x, p.y);
};

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
