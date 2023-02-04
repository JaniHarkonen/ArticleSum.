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
}

export const distanceBetweenPoints = (p1, p2) => {
  const p = subtractPoints(p1, p2);
  return pythagoras(p.x, p.y);
};
