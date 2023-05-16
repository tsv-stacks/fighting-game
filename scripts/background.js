const bgImg1 = new Image();
bgImg1.src = "./assets/backgrounds/background1.png";
const bgImg2 = new Image();
bgImg2.src = "./assets/backgrounds/background2.png";
const bgImg3 = new Image();
bgImg3.src = "./assets/backgrounds/background3.png";
const bgImg4 = new Image();
bgImg4.src = "./assets/backgrounds/background4.png";
const bgImg5 = new Image();
bgImg5.src = "./assets/backgrounds/background5.png";
const bgImg6 = new Image();
bgImg6.src = "./assets/backgrounds/background6.png";
const bgImg7 = new Image();
bgImg7.src = "./assets/backgrounds/background7.png";
const bgImg8 = new Image();
bgImg8.src = "./assets/backgrounds/background8.png";
const bgImg9 = new Image();
bgImg9.src = "./assets/backgrounds/background9.jpg";
const bgImg10 = new Image();
bgImg10.src = "./assets/backgrounds/background10.png";

const imgArray = [
  bgImg1,
  bgImg2,
  bgImg3,
  bgImg4,
  bgImg5,
  bgImg6,
  bgImg7,
  bgImg8,
  bgImg9,
  bgImg10,
];

export function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

export function background(context, width, height, randomNum) {
  return context.drawImage(imgArray[randomNum - 1], 0, 0, width, height);
}
