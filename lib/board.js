export default class Board {
  constructor() {
    this.canvas = document.getElementById('tronGame');
    this.svg = document.getElementById('svg');
    this.start_button = document.getElementById('start');
    this.pause_button = document.getElementById('paused');
    this.game_over_button = document.getElementById('game_over');
    this.victory_button = document.getElementById('victory');

    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  initBoard() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, 600, 600);

    this.drawGrid(this.ctx, this.canvas.height, this.canvas.width, 25);

    this.startState();
  }

  drawGrid(ctx, w, h, step) {
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(0,255,255, 1)';

    for (let i = step; i < w; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }

    for (let j = step; j < h; j += step) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(w, j);
      ctx.stroke();
    }

    for (let i = step; i < w; i += step) {
      for (let j = step; j < h; j += step) {
        ctx.beginPath();
        ctx.arc(i, j, (step / 7.5), 0, 2*Math.PI);
        ctx.stroke();
      }
    }
  }

  startState() {
    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.pause_button.classList.add('hidden');
    this.game_over_button.classList.add('hidden');
    this.victory_button.classList.add('hidden');

    this.start_button.classList.remove('hidden');
  }

  playState() {
    this.svg.classList.remove('shroud');
    this.canvas.classList.remove('shroud');
    this.start_button.classList.add('hidden');
    this.pause_button.classList.add('hidden');
  }

  pauseState() {
    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.pause_button.classList.remove('hidden');
  }

  gameOverState() {
    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.game_over_button.classList.remove('hidden');
  }

  victoryState() {
    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.victory_button.classList.remove('hidden');
  }
}
