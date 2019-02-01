export default class Camera {


    constraints = {
        audio: true,
        video: {
            deviceId: null,
            width: 500,
            height: 500
        }
    }

    /**
     * Get camera devices
     */
    getDevices() {
        return window.navigator.mediaDevices.enumerateDevices()
    }

    /**
     * Get single camara stream
     * @param {*} device 
     */
    getDeviceStream(device) {

        this.constraints.deviceId = device.deviceId
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return navigator.mediaDevices.getUserMedia(this.constraints)
        }

        return new Promise((resolve, reject) => {
            reject('Browser not support')
        })




    }


    attachVideo(videoEl) {

        this.getDeviceStream(selectedDevice)
            .then((stream) => {
                videoEl.srcObject = stream
                videoEl.play();
            })

    }
}