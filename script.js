let done = false;

var loadFile = function(event) {
  var image = document.getElementById('image');
  image.src = URL.createObjectURL(event.target.files[0]);
  detect();
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function detect() {
  const classifier = ml5.imageClassifier('MobileNet');
  classifier.classify(document.getElementById("image"), gotResult);
  scnmsg();
}

async function scnmsg() {
  let res = document.getElementById("result");
  let msgs = ["Scanning", "Loading", "Detecting", "Finding", "Cracking the code", "Identifying", "Discovering", "Admiring", "Learning", "Searching", "Questioning your files"];
  while (done === false) {
    let msg = msgs[Math.floor(Math.random() * msgs.length)];
    res.textContent = msg + ".";
    await sleep(50);
    res.textContent = msg + "..";
    await sleep(50);
    res.textContent = msg + "...";
    await sleep(20);
  }
}

function gotResult(error, results) {
  done = true;
  const element = document.getElementById("result");
  if (error) {
    element.innerHTML = error;
  } else {
    let num = results[0].confidence * 100;
    element.innerHTML = results[0].label + "<br>Confidence: " + num.toFixed(2) + "%";
  }
}