export default function drawMarker(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
}
