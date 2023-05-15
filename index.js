import keys from "./scripts/keys.js";
import { p1sprite, p2sprite } from "./scripts/sprite.js";
import Fighter from "./scripts/Fighter.js";
import {
  decreaseTimer,
  determineWinner,
  rectangularCollision,
  timer,
  timerId,
} from "./scripts/utility.js";
import { background } from "./scripts/background.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;
  ctx.imageSmoothingEnabled = false;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gravity = 0.7;

  const player = new Fighter({
    position: {
      x: 226,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 0,
      y: 0,
    },
    imageSrc: "./assets/player1/Idle.png",
    framesMax: 8,
    scale: 2.5,
    playerOffset: { x: 215, y: 150 },
    sprites: p1sprite,
    attackBox: {
      offset: {
        x: 100,
        y: 50,
      },
      width: 160,
      height: 50,
    },
  });

  const enemy = new Fighter(
    {
      position: {
        x: 768,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      offset: {
        x: -50,
        y: 0,
      },
      imageSrc: "./assets/player2/Idle.png",
      framesMax: 4,
      scale: 2.5,
      playerOffset: { x: 215, y: 165 },
      sprites: p2sprite,
      attackBox: {
        offset: {
          x: -170,
          y: 50,
        },
        width: 170,
        height: 50,
      },
    },
    "blue"
  );

  decreaseTimer(player, enemy);

  function animate() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background(ctx, canvas.width, canvas.height);

    player.update(ctx);
    enemy.update(ctx);

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement

    if (keys.a.pressed && player.lastkey === "a") {
      player.velocity.x = -5;
      player.switchSprite("run");
    } else if (keys.d.pressed && player.lastkey === "d") {
      player.velocity.x = 5;
      player.switchSprite("run");
    } else {
      player.switchSprite("idle");
    }

    if (player.velocity.y < 0) {
      player.switchSprite("jump");
    } else if (player.velocity.y > 0) {
      player.switchSprite("fall");
    }

    // enemy movement
    if (keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight") {
      enemy.velocity.x = 5;
      enemy.switchSprite("run");
    } else if (keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft") {
      enemy.velocity.x = -5;
      enemy.switchSprite("run");
    } else {
      enemy.switchSprite("idle");
    }

    if (enemy.velocity.y < 0) {
      enemy.switchSprite("jump");
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite("fall");
    }

    //  collision detection
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: enemy,
      }) &&
      player.isAttacking &&
      player.framesCurrent === 4
    ) {
      enemy.takeHit();
      player.isAttacking = false;
      enemy.health -= 25;
      gsap.to("#enemyHealth", {
        width: `${enemy.health}%`,
      });
    }

    if (player.isAttacking && player.framesCurrent === 4) {
      player.isAttacking = false;
    }

    if (
      rectangularCollision({
        rectangle1: enemy,
        rectangle2: player,
      }) &&
      enemy.isAttacking &&
      enemy.framesCurrent === 2
    ) {
      enemy.isAttacking = false;
      player.takeHit();
      player.health -= 25;
      gsap.to("#playerHealth", {
        width: `${player.health}%`,
      });
    }

    // if player misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
      enemy.isAttacking = false;
    }

    // endgame based on health
    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy, timerId });
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("keydown", (e) => {
    if (!player.dead) {
      if (e.key === "d") {
        keys.d.pressed = true;
        player.lastkey = "d";
      } else if (e.key === "a") {
        keys.a.pressed = true;
        player.lastkey = "a";
      } else if (e.key === "w" && player.jumps < 1) {
        player.velocity.y = -20;
        player.jumps++;
      } else if (e.key === " " && !player.isAttacking) {
        player.attack();
      }
    }

    if (!enemy.dead) {
      if (e.key === "ArrowRight") {
        keys.ArrowRight.pressed = true;
        enemy.lastkey = "ArrowRight";
      } else if (e.key === "ArrowLeft") {
        keys.ArrowLeft.pressed = true;
        enemy.lastkey = "ArrowLeft";
      } else if (e.key === "ArrowUp" && enemy.jumps < 1) {
        enemy.velocity.y = -20;
        enemy.jumps++;
      } else if (e.key === ";" && !enemy.isAttacking) {
        enemy.attack();
      }
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
