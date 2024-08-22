import express, { Request, Response } from "express"
import { appConfig } from "./utils/appConfig";
import { parkRouter } from "../controllers/parkControllers";
import catchAll from "../controllers/catchAll";
import cors from "cors"

const server = express();

// allow cors
server.use(cors());

// load body
server.use(express.json());

// register controllers
server.use(parkRouter)

// catch-all
server.use(catchAll)

// run server
server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`);
})
