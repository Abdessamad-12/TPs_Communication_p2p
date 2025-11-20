navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
    }
})
.then(stream => {
    document.getElementById("localVideo").srcObject = stream;
})
.catch(err => {
    console.error("getUserMedia error:", err);
});
