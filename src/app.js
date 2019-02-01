import {
    FaceDetection
} from './facedetection';




document.addEventListener('DOMContentLoaded', () => {




    const btnStart = document.querySelector('#start')
    const btnStop = document.querySelector('#stop')


    let fd = new FaceDetection();
    fd.init('video');


    btnStop.addEventListener('click', () => {

        console.log('Stop', fd)

        fd.stop()

    })





    btnStart.addEventListener('click', () => {
        let detectionCount = 0;
        const IN_THRESHOLD = 2;


        const detection$ = fd.onDetect().subscribe(
            event => {
                console.log('Data', event.data);
                if (event.data.length) {

                    detectionCount++;

                } else {
                    detectionCount = detectionCount > 0 ? detectionCount-- : 0;
                }

                if (detectionCount > IN_THRESHOLD) {
                    console.info('>>> Facedetected ')
                    detection$.unsubscribe();
                }
            }
        )
    })

})