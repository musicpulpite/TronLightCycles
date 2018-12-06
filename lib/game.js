import PlayerBike from './player_bike.js';
import ComputerBike from './computer_bike.js';

export default class Game {
  constructor(board) {
    this.prev_points = {};
    this.board = board;

    this.player = new PlayerBike(this.prev_points, this);
    this.enemy_bikes = [
      new ComputerBike("enemy_1", [-1, 0], this.prev_points, this),
      new ComputerBike("enemy_2", [0, 1], this.prev_points, this),
      new ComputerBike("enemy_3", [0, -1], this.prev_points, this)
    ];
    this.killCount = 0;

    this.paused = true;

    this.playPauseCallback = this.playPauseCallback.bind(this);
    this.resetGame = this.resetGame.bind(this);
    window.addEventListener('keyup', this.playPauseCallback);
  }

  playPauseCallback(e) {
    if (e.keyCode !== 32) return;
    if (this.paused) {
      this.paused = false;
      this.play();
    } else {
      this.paused = true;
      this.pause();
    }
  }

  play() {
    this.board.playState();

    this.player.play();
    this.enemy_bikes.forEach((enemy) => enemy.play());
  }

  pause() {
    this.board.pauseState();

    this.player.pause();
    this.enemy_bikes.forEach((enemy) => enemy.pause());
  }

  gameOver() {
    window.removeEventListener('keyup', this.playPauseCallback);

    this.board.gameOverState();

    window.addEventListener('keyup', this.resetGame);
  }

  victory() {
    window.removeEventListener('keyup', this.playPauseCallback);

    this.player.pause();
    this.board.victoryState();

    window.addEventListener('keyup', this.resetGame);
  }

  resetGame(e) {
    if (e.keyCode !== 32) return;

    this.enemy_bikes.forEach((enemy) => enemy.pause());

    this.prev_points = {};
    this.paused = true;
    this.killCount = 0;

    this.player = new PlayerBike(this.prev_points, this);
    this.enemy_bikes = [
      new ComputerBike("enemy_1", [-1, 0], this.prev_points, this),
      new ComputerBike("enemy_2", [0, 1], this.prev_points, this),
      new ComputerBike("enemy_3", [0, -1], this.prev_points, this)
    ];

    this.board.startState();

    window.removeEventListener('keyup', this.resetGame);
    window.addEventListener('keyup', this.playPauseCallback);
  }

}
