export function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

let timer = 10;
let timerId;
export function decreaseTimer(player, enemy) {
  if (timer > 0) {
    timerId = setTimeout(() => decreaseTimer(player, enemy, timerId), 1000);
    timer--;
    document.getElementById("timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

export function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.getElementById("displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.getElementById("displayText").innerHTML = "DRAW";
  } else if (player.health > enemy.health) {
    document.getElementById("displayText").innerHTML = "PLAYER 1 WINS";
  } else if (player.health < enemy.health) {
    document.getElementById("displayText").innerHTML = "PLAYER 2 WINS";
  }
}

export { timer, timerId };
