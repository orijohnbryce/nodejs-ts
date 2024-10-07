import { Server } from "http"
import { Server as SocketServer, Socket } from "socket.io"
import { askGPT } from "./ai-service";



export default function handleScketIO(httpServer: Server): void {

    const options = { cors: { origin: "*" } };

    const socketServer = new SocketServer(httpServer, options);

    socketServer.sockets.on("connection", (socket: Socket) => {

        socket.on("client-msg", async (msg: string) => {
            const aiRes = await askGPT(msg);
            socket.emit("server-msg", aiRes)
        })
    })
}