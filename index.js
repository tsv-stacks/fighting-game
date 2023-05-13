window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;
  ctx.imageSmoothingEnabled = false;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gravity = 0.7;

  class Sprite {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
      this.lastkey = "";
      this.jumps = 0;
    }

    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
      this.draw();

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
        this.jumps = 0;
      } else {
        this.velocity.y += gravity;
      }
    }
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

  const enemy = new Sprite({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  let lastkey = "";

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

    if (keys.a.pressed && lastkey === "a") {
      player.velocity.x = -5;
    } else if (keys.d.pressed && lastkey === "d") {
      player.velocity.x = 5;
    }

    if (keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight") {
      enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft") {
      enemy.velocity.x = -5;
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("keydown", (e) => {
    if (e.key === "d") {
      keys.d.pressed = true;
      lastkey = "d";
    } else if (e.key === "a") {
      keys.a.pressed = true;
      lastkey = "a";
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
