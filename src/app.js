import {
  FaceDetection
} from "./facedetection";

/** Document content loaded  */
document.addEventListener("DOMContentLoaded", () => {
  // Dom button selections
  const btnStart = document.querySelector("#start");
  const btnStop = document.querySelector("#stop");

  // Create facedetection object
  let fd = new FaceDetection();

  // Custom video element

  let _videoEl = document.createElement("video");
  _videoEl.width = 500;
  _videoEl.height = 500;
  _videoEl.autoplay = true;
  _videoEl.muted = true;

  document.body.appendChild(_videoEl)

  fd.init(_videoEl);

  // Attach stop button action

  btnStop.addEventListener("click", () => {
    console.log("Stop", fd);

    fd.stop();
  });

  // Attach Start button event

  btnStart.addEventListener("click", () => {
    let detectionCount = 0;
    const IN_THRESHOLD = 2;

    // Start face detection
    const detection$ = fd.onDetect().subscribe(event => {
      console.log("Data", event.data);
      if (event.data.length) {
        detectionCount++;
      } else {
        detectionCount = detectionCount > 0 ? detectionCount-- : 0;
      }

      if (detectionCount > IN_THRESHOLD) {
        console.info(">>> Facedetected ");
        // stop face detection
        detection$.unsubscribe();
      }
    });
  });
});