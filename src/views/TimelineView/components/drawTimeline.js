export default function drawTimeline(ctx, y, length, interval, subdivision) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(length, y);
  ctx.stroke();

    // Draw ticks
  const realSubdivision = interval / subdivision;
  for( let i = 0; i < length; i += realSubdivision )
  {
    let offset = 4;
    ctx.lineWidth = 2;

    if( i % interval !== 0 )
    {
      ctx.lineWidth = 1;
      offset = 2;
    }

    ctx.beginPath();
    ctx.moveTo(i, y - offset);
    ctx.lineTo(i, y + offset);
    ctx.stroke();
  }
}
