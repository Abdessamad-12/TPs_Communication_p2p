var sendChannel, receiveChannel;
var localPeerConnection, remotePeerConnection;

var startButton = document.getElementById("startButton");
var sendButton = document.getElementById("sendButton");
var closeButton = document.getElementById("closeButton");

var dataChannelSend = document.getElementById("dataChannelSend");
var dataChannelReceive = document.getElementById("dataChannelReceive");

sendButton.disabled = true;
closeButton.disabled = true;

startButton.onclick = createConnection;
sendButton.onclick = sendData;
closeButton.onclick = closeDataChannels;

function createConnection() {
  localPeerConnection = new RTCPeerConnection();
  sendChannel = localPeerConnection.createDataChannel("sendDataChannel");

  localPeerConnection.onicecandidate = e => {
    if (e.candidate) remotePeerConnection.addIceCandidate(e.candidate);
  };

  sendChannel.onopen = () => { dataChannelSend.disabled = false; sendButton.disabled = false; };
  sendChannel.onclose = () => { dataChannelSend.disabled = true; sendButton.disabled = true; };

  remotePeerConnection = new RTCPeerConnection();
  remotePeerConnection.ondatachannel = event => {
    receiveChannel = event.channel;
    receiveChannel.onmessage = e => dataChannelReceive.value = e.data;
  };

  remotePeerConnection.onicecandidate = e => {
    if (e.candidate) localPeerConnection.addIceCandidate(e.candidate);
  };

  localPeerConnection.createOffer()
    .then(offer => {
      localPeerConnection.setLocalDescription(offer);
      remotePeerConnection.setRemoteDescription(offer);

      return remotePeerConnection.createAnswer();
    })
    .then(answer => {
      remotePeerConnection.setLocalDescription(answer);
      localPeerConnection.setRemoteDescription(answer);
    });
}

function sendData() {
  sendChannel.send(dataChannelSend.value);
}

function closeDataChannels() {
  sendChannel.close();
  receiveChannel.close();
  localPeerConnection.close();
  remotePeerConnection.close();
}
