class Fighter {
  constructor(
    {
      position,
      velocity,
      offset,
      imageSrc,
      scale = 1,
      framesMax = 1,
      playerOffset = { x: 0, y: 0 },
      sprites,
    },
    color = "red"
  ) {
    this.sprites = sprites;
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

    this.playerOffset = playerOffset;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.playerOffset.x,
      this.position.y - this.playerOffset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );

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

    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }

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
      this.position.y = 366;
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

  switchSprite(sprite) {
    if (sprite === "idle" && this.image !== this.sprites.idle.image) {
      this.image = this.sprites.idle.image;
      this.framesMax = this.sprites.idle.framesMax;
      this.framesCurrent = 0;
    } else if (sprite === "run" && this.image !== this.sprites.run.image) {
      this.image = this.sprites.run.image;
      this.framesMax = this.sprites.run.framesMax;
      this.framesCurrent = 0;
    } else if (sprite === "jump" && this.image !== this.sprites.jump.image) {
      this.image = this.sprites.jump.image;
      this.framesMax = this.sprites.jump.framesMax;
      this.framesCurrent = 0;
    } else if (sprite === "fall" && this.image !== this.sprites.fall.image) {
      this.image = this.sprites.fall.image;
      this.framesMax = this.sprites.fall.framesMax;
      this.framesCurrent = 0;
    }
  }
}

export default Fighter;
