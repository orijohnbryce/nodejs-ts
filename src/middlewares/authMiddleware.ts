import { NextFunction, Request, Response } from "express";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    
    // some logic to check if user registered
    // if (user not have auth credentials){
    //     res.status(401).send("credentials are missing or wrong")
    // }

    console.log("authMiddleware is running ...");
    // res.status(401).send("credentials are missing or wrong")
    
    next()
}