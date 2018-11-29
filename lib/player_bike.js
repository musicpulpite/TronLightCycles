class PlayerBike {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.x = (canvas.width / 2);
    this.y = (canvas.height / 2);
    this.vel = [1, 0];

    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = 'rgba(254, 78, 66, 1)';
    this.handleVel();
  }

  move() {
    const bike = new Path2D();
    this.ctx.beginPath();
    bike.moveTo(this.x, this.y);

    const increment = () => {
      this.x += this.vel[0];
      this.y += this.vel[1];
      if (this.x === 500) {bike.closePath()}

      bike.lineTo(this.x, this.y);
      this.ctx.stroke(bike);
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
