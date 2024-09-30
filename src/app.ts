import express, { Request, Response } from "express"
import { notesRouts } from "./controllers/notesController";

const server = express();

// load body
server.use(express.json());

server.use(notesRouts);

server.listen(3000, ()=>{console.log("Listening on http://localhost:3000");
})
