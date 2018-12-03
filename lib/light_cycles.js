import { initBoard } from './board.js';
import Game from './game.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('tronGame');

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    initBoard(canvas, ctx);
  }

  const game = new Game();
})
