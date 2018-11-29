class ComputerBike {
  constructor(poly, init_vel, prev_points) {
    this.poly = poly;
    this.x = 300;
    this.y = 300;
    this.vel = init_vel;

    this.prev_points = prev_points;

    this.handleMove();
  }

  handleMove() {
    const increment = () => {
      this.handleVel();
      this.x += this.vel[0];
      this.y += this.vel[1];

      const point = svg.createSVGPoint();
      point.x = this.x;
      point.y = this.y;

      if (this.prev_points[[this.x, this.y]]) {
        const svg = document.getElementById('svg');
        svg.removeChild(this.poly);
        clearInterval(move);
        this.clearPositions();
      } else if ([0, 600].includes(this.x) || [0, 600].includes(this.y)) {
        const svg = document.getElementById('svg');
        svg.removeChild(this.poly);
        clearInterval(move);
        this.clearPositions();
      }
      this.prev_points[[this.x, this.y]] = true;

      this.poly.points.appendItem(point);
    }

    const move = setInterval(increment, 10);
  }

  handleVel() {
    const prob = Math.random();

    if (prob < 0.005) {
      this.vel = this.vel.reverse();
      this.vel[0] = -1*this.vel[0];
      this.vel[1] = -1*this.vel[1];
    } else if (prob < 0.01) {
      this.vel = this.vel.reverse();
    }
  }

  clearPositions() {
    Object.values(this.poly.points).forEach((SVGPoint) => {
      const point = [SVGPoint.x, SVGPoint.y];
      delete this.prev_points[point];
    });
  }

}

export default ComputerBike;
