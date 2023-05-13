window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;

  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
