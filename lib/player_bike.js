class PlayerBike {
  constructor(prev_points) {
    this.player_poly = document.getElementById('player');
    this.x = 300;
    this.y = 300;
    this.vel = [1, 0];

    this.prev_points = prev_points;

    this.handleVel();
  }

  move() {
    const increment = () => {
      this.x += this.vel[0];
      this.y += this.vel[1];

      const point = svg.createSVGPoint();
      point.x = this.x;
      point.y = this.y;

      if (this.prev_points[[this.x, this.y]]) {
        const svg = document.getElementById('svg');
        svg.removeChild(this.player_poly);
        clearInterval(move);
      } else if ([0, 600].includes(this.x) || [0, 600].includes(this.y)) {
        const svg = document.getElementById('svg');
        svg.removeChild(this.player_poly);
        clearInterval(move);
      }
      this.prev_points[[this.x, this.y]] = true;

      this.player_poly.points.appendItem(point);
    };

    const move = setInterval(increment, 10);
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

};

export default PlayerBike;
