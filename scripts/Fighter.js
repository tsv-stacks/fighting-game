class Fighter {
  constructor({ position, velocity, offset }, color = "red") {
    this.position = position;
    this.velocity = velocity;
    this.canvasWidth = 1024;
    this.canvasHeight = 576;
    this.gravity = 0.7;
    this.width = 50;
    this.height = 150;
    this.lastkey = "";
    this.jumps = 0;
    this.color = color;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset,
      width: 100,
      height: 50,
    };
    this.isAttacking = false;
    this.health = 100;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.isAttacking) {
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update(ctx) {
    this.draw(ctx);
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Check if out of bounds on the left
    if (this.position.x + this.velocity.x < 0) {
      this.velocity.x = 0;
      this.position.x = 0;
    }

    // Check if out of bounds on the right
    if (this.position.x + this.velocity.x + 50 > this.canvasWidth) {
      this.velocity.x = 0;
      this.position.x = this.canvasWidth - 50;
    }

    // check player on ground
    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvasHeight - 60
    ) {
      this.velocity.y = 0;
      this.jumps = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

export default Fighter;
