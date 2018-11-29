export const initBoard = (canvas, ctx) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, 600, 600);

    drawGrid(ctx, canvas.height, canvas.width, 25);
}

const drawGrid = (ctx, w, h, step) => {
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'rgba(0,255,255, 1)';

  for (let i = 0; i <= w; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }

  for (let j = 0; j <= h; j += step) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(w, j);
    ctx.stroke();
  }

  for (let i = 0; i <= w; i += step) {
    for (let j = 0; j <= h; j += step) {
      ctx.beginPath();
      ctx.arc(i, j, (step / 7.5), 0, 2*Math.PI);
      ctx.stroke();
    }
  }
}
