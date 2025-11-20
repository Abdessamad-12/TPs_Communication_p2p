const staticServer = require("node-static");
const http = require("http");

const file = new staticServer.Server("../client");

const app = http.createServer((req, res) => {
  file.serve(req, res);
}).listen(8181, () => {
  console.log("Serveur WebRTC lancé sur http://localhost:8181");
});

const io = require("socket.io")(app);

// ============================
// SERVER SIGNALING
// ============================

io.on("connection", socket => {
  console.log("Client connecté :", socket.id);

  socket.on("create or join", channel => {
    const room = io.sockets.adapter.rooms.get(channel);
    const numClients = room ? room.size : 0;

    console.log("Clients dans", channel, "=", numClients);

    if (numClients === 0){
      socket.join(channel);
      socket.emit("created", channel);
    }

    else if (numClients === 1){
      io.in(channel).emit("remotePeerJoining", channel);
      socket.join(channel);
      socket.emit("joined", channel);
      socket.broadcast.to(channel).emit("broadcast: joined",
        "Client " + socket.id + " a rejoint " + channel
      );
    }

    else {
      socket.emit("full", channel);
    }
  });

  socket.on("message", msg => {
    socket.broadcast.to(msg.channel).emit("message", msg.message);
  });

  socket.on("response", response => {
    socket.broadcast.to(response.channel).emit("response", response.message);
  });

  socket.on("Bye", channel => {
    socket.broadcast.to(channel).emit("Bye");
  });

  socket.on("Ack", () => {
    socket.disconnect();
  });
});
