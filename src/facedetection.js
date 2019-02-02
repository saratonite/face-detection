import "tracking/build/tracking";
import "tracking/build/data/face-min.js";
import "tracking/build/data/eye-min.js";
import "tracking/build/data/mouth-min.js";

import { fromEvent } from "rxjs";

export class FaceDetection {
  constructor() {
    this.faceTracker = null;

    this.trackingTask = null;
  }

  init(videoElement) {
    let _videoEl = document.createElement("video");
    _videoEl.width = 500;
    _videoEl.height = 500;
    _videoEl.autoplay = true;
    _videoEl.muted = true;

    this.faceTracker = new tracking.ObjectTracker("face");
    this.faceTracker.setInitialScale(4);
    this.faceTracker.setStepSize(2);
    this.faceTracker.setEdgesDensity(0.1);

    this.trackingTask = tracking.track("video", this.faceTracker, {
      camera: true
    });
  }

  onDetect() {
    return fromEvent(this.faceTracker, "track");
  }

  stop() {
    if (!this.trackingTask) return;

    this.trackingTask.stop();

    this.stopCamera();
  }

  stopCamera() {
    console.dir(this.trackingTask);

    console.dir(this.faceTracker);

    tracking.stopUserMedia();
  }
}
