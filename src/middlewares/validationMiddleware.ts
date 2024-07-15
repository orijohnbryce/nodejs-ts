import { NextFunction, Request, Response } from "express";
import CarModel from "../models/carModel";

export default function validateCarAllFields(req: Request, res: Response, next: NextFunction) {

    const { id, name, km, engine, year, price } :CarModel = req.body
    if (typeof name !== 'string' || name.length < 2){
       res.status(400).send("Name must be with at least 2 charachters");
       return;
    }  
    // if (type of km ...) {
    //     res.status(400).send(
    // }
    //
    // etc

    next()
}