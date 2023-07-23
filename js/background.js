const images = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const container = document.querySelector(".container");

const chosenImageNumber = images[Math.floor(Math.random() * images.length)];

const backgroundImage = `url(img/${chosenImageNumber}.jpg)`;

container.style.backgroundImage = backgroundImage;
