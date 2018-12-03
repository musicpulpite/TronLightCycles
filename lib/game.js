import PlayerBike from './player_bike.js';
import ComputerBike from './computer_bike.js';

class Game {
  constructor() {
    this.prev_points = {};
    this.canvas = document.getElementById('tronGame');
    this.svg = document.getElementById('svg');
    this.start_button = document.getElementById('start');
    this.pause_button = document.getElementById('paused');

    this.player = new PlayerBike(this.prev_points);
    this.enemy_bikes = [
      new ComputerBike("enemy_1", [-1, 0], this.prev_points),
      new ComputerBike("enemy_2", [0, 1], this.prev_points),
      new ComputerBike("enemy_3", [0, -1], this.prev_points)
    ];

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.pause_button.classList.add('hidden');

    window.addEventListener('keyup', this.play)
  }

  play(e) {
    if (e.keyCode !== 32) {return}

    this.svg.classList.remove('shroud');
    this.canvas.classList.remove('shroud');
    this.start_button.classList.add('hidden');
    this.pause_button.classList.add('hidden');

    this.player.play();
    this.enemy_bikes.forEach((enemy) => enemy.play());

    window.removeEventListener('keyup', this.play);
    window.addEventListener('keyup', this.pause);
  }

  pause(e) {
    if (e.keyCode !== 32) {return}

    this.svg.classList.add('shroud');
    this.canvas.classList.add('shroud');
    this.pause_button.classList.remove('hidden');

    this.player.pause();
    this.enemy_bikes.forEach((enemy) => enemy.pause());


    window.removeEventListener('keyup', this.pause);
    window.addEventListener('keyup', this.play);
  }

}

export default Game;
