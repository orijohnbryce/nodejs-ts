import express, { Request, Response } from "express"
import { appConfig } from "./utils/appConfig";
import { parkRouters } from "./controllers/parkControllers";
import cors from "cors"
import catchAll from "./middlewares/catchAll";

// create server
const server = express();

// // allow cors
// let corsOptions = {
//     origin : ['http://localhost:4000'],
// }
// server.use(cors(corsOptions));
server.use(cors());

// load body
server.use(express.json());

// register controllers:
server.use("/", parkRouters)

// catch erros
server.use(catchAll)

server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`);
})
