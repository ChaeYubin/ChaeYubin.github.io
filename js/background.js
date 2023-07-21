const images = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}.jpg`;
// bgImage.width = "100%";
// bgImage.height = "100%";

document.body.appendChild(bgImage);
