import { NextFunction, Request, Response } from "express"

export default function logMiddleware(req: Request, res: Response, next: NextFunction) {
    
    // some logic to write rquest info to log ....
    console.log("logMiddleware is running ... ");    

    next();
}