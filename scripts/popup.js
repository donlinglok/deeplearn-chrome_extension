let trainTimes = 0;

let LABEL_STILL = '0';
let LABEL_UP = '1';
let LABEL_DOWN = '2';

document.addEventListener('DOMContentLoaded', () => {
  let video = document.getElementById('video');
  let still = document.getElementById('still');
  let up = document.getElementById('up');
  let down = document.getElementById('down');

  const classifier = ml5.imageClassifier('MobileNet', () => {
    console.log('Model Loaded');
  });

  // Still 
  still.addEventListener('click', () => {
    console.log('still click');
    classifier.classify(video, (err, result) => {
      console.log(result);
      LABEL_STILL = result[0].label;
      trainTimes++;
      console.log('still complete:' + trainTimes);
    });
  });

  // Up
  up.addEventListener('click', () => {
    console.log('up click');
    classifier.classify(video, (err, result) => {
      console.log(result);
      LABEL_UP = result[0].label;
      trainTimes++;
      console.log('up complete:' + trainTimes);
    });
  });

  // Down
  down.addEventListener('click', () => {
    console.log('down click');
    classifier.classify(video, (err, result) => {
      console.log(result);
      LABEL_DOWN = result[0].label;
      trainTimes++;
      console.log('down complete:' + trainTimes);
    });
  });

  setInterval(() => {
    if (trainTimes > 9) {
      classifier.classify(video, (err, result) => {
        console.log(result);
        if (result[0].label == LABEL_STILL) {
          console.log('still');
          // DO NOTHING
        } else if (result[0].label == LABEL_UP) {
          console.log('up');
          chrome.runtime.sendMessage({ direction: "up" });
        } else if (result[0].label == LABEL_DOWN) {
          console.log('down');
          chrome.runtime.sendMessage({ direction: "down" });
        }
      });
    }
  }, 1000);

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: false, video: true },
      (stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      },
      (err) => {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
});

console.log('popup ready!');