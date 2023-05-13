window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gravity = 0.2;

  class Sprite {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
    }

    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
      this.draw();

      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
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

  function animate() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    requestAnimationFrame(animate);
  }

  animate();
});
