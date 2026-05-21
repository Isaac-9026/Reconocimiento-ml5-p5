let classifier; //ML5
let imageModelURL = "./models/"; //Ruta

//Gestion de video
let video;
let flippedVideo;

//Etiqueta
let label = "";

//Cargar el modelo (red neuronal entrenada en una o más tareas)
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);

  //cámara
  video = createCapture(VIDEO);
  video.size(320, 260);
  video.hide();

  //flippedVideo = ml5.flipImage(video);

  classifyVideo();
}

function draw() {
  background(255);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  //Mostrar el resultado (sobre el canvas)...
}

function classifyVideo() {
  //flippedVideo = ml5.flipImage(video);
  classifier.classify(video, goResult);
  //flippedVideo.remove();
}

function goResult(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  document.getElementById("descripcion").value = result[0].label;
  document.getElementById("confianza").value = result[0].confidence;

  // Mostrar todos los resultados con barras
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  result.forEach((item) => {
    const percentage = Math.round(item.confidence * 100);

    const resultItem = document.createElement("div");
    resultItem.className = "result-item";

    const label = document.createElement("div");
    label.className = "result-label";
    label.textContent = item.label;

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = percentage + "%";
    fill.textContent = percentage + "%";

    progressBar.appendChild(fill);
    resultItem.appendChild(label);
    resultItem.appendChild(progressBar);
    resultsDiv.appendChild(resultItem);
  });

  classifyVideo();
}
