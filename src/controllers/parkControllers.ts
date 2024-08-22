import express, { Request, Response, NextFunction } from "express";
import { getParks, updateOccupied } from "../services/parkService";

export const parkRouters = express.Router();

parkRouters.get("/parks", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parks = await getParks();
        res.status(200).json(parks);
    } catch (error) {
        next(error)  // TODO: add catchAll
    }
})

parkRouters.patch("/parks/:id",async (req: Request, res: Response, next: NextFunction) => {

    console.log("YO");
    
    try {                
        const id = +req.params.id;
        const newValue = req.body.newValue;
        
        if (newValue === undefined){
            res.status(400).send("newValue is missing");
            return;
        }        
        await updateOccupied(id, newValue);
        res.status(200).send("Updated")

    } catch (error) {
        next(error)
    }
})