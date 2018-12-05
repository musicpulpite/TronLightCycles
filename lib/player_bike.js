class PlayerBike {
  constructor(prev_points, game) {
    this.prev_points = prev_points;
    this.game = game;

    this.player_poly = document.getElementById('player');
    this.player_poly.setAttribute('points', '300,300')
    this.x = 300;
    this.y = 300;
    this.vel = [1, 0];
  }

  play() {
    this.handleVel();
    this.handleMove();
  }

  pause() {
    window.removeEventListener('keyup', (e) => updateVel(e));
    clearInterval(this.moveFunction);
  }

  handleMove() {
    const increment = () => {
      this.x += this.vel[0];
      this.y += this.vel[1];

      const point = svg.createSVGPoint();
      point.x = this.x;
      point.y = this.y;

      if (this.prev_points[[this.x, this.y]]) {
        this.pause();
        this.clearPositions();
        this.game.gameOver();
      } else if ([0, 600].includes(this.x) || [0, 600].includes(this.y)) {
        this.pause();
        this.clearPositions();
        this.game.gameOver();
      } else {
        this.prev_points[[this.x, this.y]] = true;
        this.player_poly.points.appendItem(point);
      }
    };

    this.moveFunction = setInterval(increment, 10);
  }

  handleVel() {
    const updateVel = (e) => {
      switch(e.keyCode) {
        // left or a
        case 37: case 65:
          if (this.vel[0] !== 1 && this.vel[1] !== 0) {
            this.vel = [-1, 0];
          };
          break;

        // up or w
        case 38: case 87:
          if (this.vel[0] !== 0 && this.vel[1] !== 1) {
            this.vel = [0, -1];
          };
          break;

        // right or d
        case 39: case 68:
          if (this.vel[0] !== -1 && this.vel[1] !== 0) {
            this.vel = [1, 0];
          };
          break;

        // down or s
        case 40: case 83:
          if (this.vel[0] !== 0 && this.vel[1] !== -1) {
            this.vel = [0, 1];
          };
          break;

        default:
          break;
      }
    }

    window.addEventListener('keyup', (e) => updateVel(e));
  }

  clearPositions() {
    let i = this.player_poly.points.length - 1;

    while (i > 0) {
      let prev_point = [
        this.player_poly.points[i].x,
        this.player_poly.points[i].y
      ];

      delete this.prev_points[prev_point];
      this.player_poly.points.removeItem(i);
      i--;
    }
  }

};

export default PlayerBike;
