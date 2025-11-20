const div = document.getElementById('scratchPad');
const socket = io.connect("http://localhost:8181");

function log(msg){
  const p = document.createElement("p");
  p.textContent = msg;
  div.appendChild(p);
}

let channel = prompt("Enter signaling channel name:");
if (!channel) channel = "default";

socket.emit("create or join", channel);

socket.on("created", ch => {
  log("Channel créé : " + ch + " (vous êtes l'initiateur).");
});

socket.on("full", ch => {
  log("Le channel " + ch + " est plein.");
});

socket.on("remotePeerJoining", ch => {
  log("Un pair rejoint : " + ch);
});

socket.on("joined", msg => {
  log("Channel rejoint : " + msg);
});

socket.on("broadcast: joined", msg => {
  log("Broadcast : " + msg);

  const txt = prompt("Message à envoyer au pair:");
  socket.emit("message", { channel: channel, message: txt });
});

socket.on("message", message => {
  log("Message reçu : " + message);

  const reply = prompt("Réponse à envoyer:");
  socket.emit("response", { channel: channel, message: reply });
});

socket.on("response", response => {
  log("Réponse reçue : " + response);

  const next = prompt('Continuer (ou écrire "Bye") :');
  if (next === "Bye"){
    socket.emit("Bye", channel);
    socket.disconnect();
  } else {
    socket.emit("response", { channel: channel, message: next });
  }
});

socket.on("Bye", () => {
  log("Le pair a quitté. Envoi Ack et déconnexion...");
  socket.emit("Ack");
  socket.disconnect();
});
