import express from "express";
import appConfig from "./utils/appConfig";
import handleSocketIo from "./services/socket-service";

const expressServer = express();
const httpServer = expressServer.listen(appConfig.port, () => {
  console.log("Listening on http://localhost:" + appConfig.port);
});

handleSocketIo(httpServer);
