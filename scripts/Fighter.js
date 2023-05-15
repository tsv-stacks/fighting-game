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
      attackBox = { offset: {}, width: undefined, height: undefined },
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
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
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
    this.dead = false;

    this.attackCooldown = false;

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
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update(ctx) {
    this.draw(ctx);

    if (!this.dead) {
      this.animateFrames();
    }

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
      this.position.y = 366;
      this.jumps = 0;
    } else {
      this.velocity.y += this.gravity;
    }

    if (this.health <= 0) {
      this.switchSprite("death");
    }
  }

  attack() {
    if (this.attackCooldown) {
      return;
    }
    this.switchSprite("attack1");
    this.attackCooldown = true;
    this.isAttacking = true;

    setTimeout(() => {
      this.attackCooldown = false;
    }, 600);
  }

  takeHit() {
    this.switchSprite("takeHit");

    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

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
    } else if (
      sprite === "attack1" &&
      this.image !== this.sprites.attack1.image
    ) {
      this.image = this.sprites.attack1.image;
      this.framesMax = this.sprites.attack1.framesMax;
      this.framesCurrent = 0;
    } else if (
      sprite === "takeHit" &&
      this.image !== this.sprites.takeHit.image
    ) {
      this.image = this.sprites.takeHit.image;
      this.framesMax = this.sprites.takeHit.framesMax;
      this.framesCurrent = 0;
    } else if (sprite === "death" && this.image !== this.sprites.death.image) {
      this.image = this.sprites.death.image;
      this.framesMax = this.sprites.death.framesMax;
      this.framesCurrent = 0;
    }
  }
}

export default Fighter;
