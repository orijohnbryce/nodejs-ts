import express, { NextFunction, Request, Response } from "express"
import { readNotes } from "../services/notesService"


export const notesRouts = express.Router()

notesRouts.get("/notes", async (req: Request, res: Response, next: NextFunction)=>{
    const notes = await readNotes();
    res.status(200).json(notes);
})