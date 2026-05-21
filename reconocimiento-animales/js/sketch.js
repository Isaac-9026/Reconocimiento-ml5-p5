let classifier;
let img;
let currentImagePath = "images/animal01.jpg";

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage(currentImagePath);
}

function setup() {
  let container = document.getElementById("canvas-container");
  createCanvas(400, 400);
  container.appendChild(document.querySelector("canvas"));
  classifier.classify(img, goResult);
  displayImage();
}

function displayImage() {
  image(img, 0, 0, width, height);
}

function goResult(result) {
  console.log(result);
  const percentage = Math.round(result[0].confidence * 100);
  
  document.getElementById("category").textContent = "Categoría: " + result[0].label;
  document.getElementById("percentage").textContent = "Confianza: " + percentage + "%";
}

// Selector de imágenes
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("image-selector");
  selector.addEventListener("change", (e) => {
    currentImagePath = e.target.value;
    img = loadImage(currentImagePath, () => {
      background(255);
      displayImage();
      classifier.classify(img, goResult);
    });
  });
});