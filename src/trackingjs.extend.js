/**
 * Overriding Trackingjs initUserMedia_
 */



if (tracking) {


    /**
     * Captures the user camera when tracking a video element and set its source
     * to the camera stream.
     * @param {HTMLVideoElement} element Canvas element to track.
     * @param {object} opt_options Optional configuration to the tracker.
     */

    tracking.initUserMedia_ = function (element, opt_options) {
        window.navigator.getUserMedia({
            video: true,
            audio: !!(opt_options && opt_options.audio)
        }, function (stream) {

            window.localStream = stream;
            try {
                element.src = window.URL.createObjectURL(stream);
            } catch (err) {
                element.src = stream;
            }
        }, function () {
            throw Error('Cannot capture user camera.');
        });
    };


    /**
     * Stop camera streaming
     */

    tracking.stopUserMedia = function () {
        if (window.localStream) {

            window.localStream.getVideoTracks()[0].stop();
        }

    }
}