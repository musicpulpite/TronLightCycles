import { initBoard } from './board.js';
import PlayerBike from './player_bike_2.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('tronGame');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    initBoard(canvas, ctx);
    const player = new PlayerBike();
    player.move();
  }
})
