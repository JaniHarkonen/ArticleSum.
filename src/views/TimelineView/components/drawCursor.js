export default function(ctx, xOffset, y, height) {
  const h = height / 2;
  ctx.beginPath();
  ctx.setLineDash([5, 3]);
  ctx.moveTo(xOffset, y - h);
  ctx.lineTo(xOffset, y + h);
  ctx.stroke();
}
