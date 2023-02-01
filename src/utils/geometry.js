export function Point(x = 0, y = 0) {
  return { x: x, y: y };
}

export function Point(p) {
  return Point(p.x, p.y);
}

export function Dimension(width = 0, height = 0) {
  return { width: width, height: height };
}

export function Dimension(d) {
  return Dimension(d.width, d.height);
}

export const addPoints = (p1, p2) => {
  const p = Point(p1);
  p.x += p2.x;
  p.y += p2.y;
  return p;
};

export const subtractPoints = (p1, p2) => {
  const p = Point(p1);
  p.x -= p2.x;
  p.y -= p2.y;
  return p;
};
