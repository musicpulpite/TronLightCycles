import Board from './board.js';
import Game from './game.js';

window.addEventListener('DOMContentLoaded', () => {
  const board = new Board();
  board.initBoard();

  const game = new Game(board);
})
