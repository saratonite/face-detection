import { from, throwError } from "rxjs";
export default class Camera {
  constructor() {
    this.constraints = {
      audio: true,
      video: {
        deviceId: null,
        width: 500,
        height: 500
      }
    };
  }

  /**
   * Get camera devices
   */
  getDevices() {
    return from(window.navigator.mediaDevices.enumerateDevices());
  }

  /**
   * Get single camara stream
   * @param {*} device
   */
  getDeviceStream(device) {
    this.constraints.deviceId = device.deviceId;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return from(navigator.mediaDevices.getUserMedia(this.constraints));
    }

    return throwError("Browser not support");
  }

  //   attachVideo(videoEl) {
  //     this.getDeviceStream(selectedDevice).then(stream => {
  //       videoEl.srcObject = stream;
  //       videoEl.play();
  //     });
  //   }
}
