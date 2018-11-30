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
    const RIGHT_TURNS = {
      "0,1": [-1, 0],
      "-1,0": [0, -1],
      "0,-1": [1, 0],
      "1,0": [0, 1],};

    const LEFT_TURNS = {
      "0,1": [1, 0],
      "1,0": [0, -1],
      "0,-1": [-1, 0],
      "-1,0": [0, 1],};

    let dist = this.calcDist();
    let prob_thresh = 1 / (dist + 1);
    let prob = Math.random();

    if (prob < prob_thresh / 2) {
      this.vel = LEFT_TURNS[String(this.vel)];
    } else if (prob < prob_thresh) {
      this.vel = RIGHT_TURNS[String(this.vel)];
    }
  }

  calcDist() {
    let dist = 1;

    while (dist < 600) {
      let pos_temp = [(this.x + dist*this.vel[0]), (this.y + dist*this.vel[1])];

      if (this.prev_points[pos_temp]) {
        return dist;
      } else if ([0, 600].includes(pos_temp[0]) || [0, 600].includes(pos_temp[1])) {
        return dist;
      } else {
        dist++;
      }
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
