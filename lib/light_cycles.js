import { initBoard } from './board.js';
import PlayerBike from './player_bike.js';
import ComputerBike from './computer_bike.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('tronGame');
  const canvasOverlay = document.getElementById('tronGameOverlay');

  if (canvas.getContext && canvasOverlay.getContext) {
    let ctx = canvas.getContext('2d');
    let ctxOverlay = canvasOverlay.getContext('2d');
    initBoard(canvas, ctx, ctxOverlay);

    const prev_points = {};
    const player = new PlayerBike(prev_points);
    const enemy_1_poly = document.getElementById('enemy_1');
    const enemy_1 = new ComputerBike(enemy_1_poly, [-1, 0], prev_points);
    const enemy_2_poly = document.getElementById('enemy_2');
    const enemy_2 = new ComputerBike(enemy_2_poly, [0, 1], prev_points);
    const enemy_3_poly = document.getElementById('enemy_3');
    const enemy_3 = new ComputerBike(enemy_3_poly, [0, -1], prev_points);
    player.move();
  }
})
