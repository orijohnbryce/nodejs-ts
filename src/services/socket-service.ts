import { Server } from "http";
import { Server as SocketServer, Socket } from "socket.io";

export default function handleSocketIo(httpServer: Server): void {
  const options = { cors: { origin: "*" } }; // for any client

  const socketServer = new SocketServer(httpServer, options);

  socketServer.sockets.on("connection", (socket: Socket) => {
    
    const username = socket.handshake.query.username as string;

    console.log("Client connected!");

    socket.on("new-msg", (msg: string) => {
      console.log("new message: " + msg);
      
      // message to all connected sockets
      socketServer.sockets.emit("server-msg", {username, msg});

      // message only to sender
      socket.emit("server-msg", {username: "self", msg: "got-it"});
    });
    
    socket.on("disconnect", () => {
      console.log("Client left the chat!");

      // let everyone know
      socketServer.sockets.emit("server-msg", "X left");
    });
  });
}
