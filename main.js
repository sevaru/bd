var image;
var faceCanvas;
window.onload = function () {
    image = document.getElementById('source');
    faceCanvas = document.getElementById('canvas');
};

function screen2() {
    /**
     * @type {CanvasRenderingContext2D} 
     */
    var context = faceCanvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#video', tracker, { camera: true });

    var size = 1.7;
    tracker.on('track', function (event) {
        event.data.forEach(function (rect) {
            context.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
            var width = rect.width * size;
            var height = rect.height * size;
            var offsetX = (width - rect.width) / 2;
            var offsetY = (height - rect.height) / 2;
            context.drawImage(image, rect.x - offsetX, rect.y - offsetY, width, height);
        });
    });
}