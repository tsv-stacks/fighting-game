window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;
  ctx.imageSmoothingEnabled = false;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gravity = 0.7;

  class Sprite {
    constructor({ position, velocity }, color = "red") {
      this.position = position;
      this.velocity = velocity;
      this.width = 50;
      this.height = 150;
      this.lastkey = "";
      this.jumps = 0;
      this.color = color;
      this.attackBox = {
        position: this.position,
        width: 100,
        height: 50,
      };
      this.isAttacking = false;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

      ctx.fillStyle = "green";
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }

    update() {
      this.draw();

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      // Check if out of bounds on the left
      if (this.position.x + this.velocity.x < 0) {
        this.velocity.x = 0;
        this.position.x = 0;
      }

      // Check if out of bounds on the right
      if (this.position.x + this.velocity.x + 50 > canvas.width) {
        this.velocity.x = 0;
        this.position.x = canvas.width - 50;
      }

      // check player on ground
      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
        this.jumps = 0;
      } else {
        this.velocity.y += gravity;
      }
    }

    attack() {}
  }

  const player = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  const enemy = new Sprite(
    {
      position: {
        x: 400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    },
    (color = "blue")
  );

  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
    ArrowUp: {
      pressed: false,
    },
  };

  function animate() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastkey === "a") {
      player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastkey === "d") {
      player.velocity.x = 5;
    }

    // enemy movement
    if (keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight") {
      enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft") {
      enemy.velocity.x = -5;
    }

    //  collision detection
    if (
      player.attackBox.position.x + player.attackBox.width >=
        enemy.position.x &&
      player.attackBox.position.x <= enemy.position.x &&
      player.attackBox.position.y + player.attackBox.height >=
        enemy.position.y &&
      player.attackBox.position.y <= enemy.position.y + enemy.height &&
      player.isAttacking
    ) {
      console.log("hit");
    }
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("keydown", (e) => {
    if (e.key === "d") {
      keys.d.pressed = true;
      player.lastkey = "d";
    } else if (e.key === "a") {
      keys.a.pressed = true;
      player.lastkey = "a";
    } else if (e.key === "w" && player.jumps < 1) {
      player.velocity.y = -23;
      player.jumps++;
    } else if (e.key === "ArrowRight") {
      keys.ArrowRight.pressed = true;
      enemy.lastkey = "ArrowRight";
    } else if (e.key === "ArrowLeft") {
      keys.ArrowLeft.pressed = true;
      enemy.lastkey = "ArrowLeft";
    } else if (e.key === "ArrowUp" && enemy.jumps < 1) {
      enemy.velocity.y = -23;
      enemy.jumps++;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "a") {
      keys.a.pressed = false;
    } else if (e.key === "d") {
      keys.d.pressed = false;
    }

    // enemy keys
    if (e.key === "ArrowRight") {
      keys.ArrowRight.pressed = false;
    } else if (e.key === "ArrowLeft") {
      keys.ArrowLeft.pressed = false;
    }
  });
});
