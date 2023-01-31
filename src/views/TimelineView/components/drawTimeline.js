export default function drawTimeline(ctx, xOffset, y, length, interval, subdivision, textSettings) {
  const intervalFontSize = textSettings?.font.size || 8;
  const intervalFontFamily = textSettings?.font.family || "Arial";
  const intervalTextAlign = textSettings?.textAlign || "center";

  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(length, y);

    // Draw ticks
  let intervalCounter = 0;  // Determines when to draw the major intervals
  const realSubdivision = interval / subdivision; // Length of a subdivision in pixels
  
  const s = length / interval * subdivision;  // Total number of divisions to draw
  for( let i = 0; i < s; i++ )
  {
    let subdOffset = 2;
    ctx.lineWidth = 1;

    const x = (i * realSubdivision) + (xOffset % interval);
    if( intervalCounter === subdivision )
    {
      subdOffset = 4;
      ctx.lineWidth = 2;

      ctx.font = intervalFontSize + "px " + intervalFontFamily;
      ctx.textAlign = intervalTextAlign;
      ctx.fillText(""+i, x, y + 16);

      intervalCounter = 0;
    }
    
    ctx.moveTo(x, y - subdOffset);
    ctx.lineTo(x, y + subdOffset);

    intervalCounter++;
  }

  ctx.stroke();
}
