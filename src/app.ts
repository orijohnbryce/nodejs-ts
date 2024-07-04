import express, { Request, Response } from "express"
import path from "path";

const server = express();
server.use(express.json())

server.post("/cars", (req: Request, res: Response)=>{
      console.log(req.body);      
      res.send("ok")
})

server.get("/cars/:id?", (req: Request, res: Response)=>{
    // retrive the the car with id = req.params.id   
    res.send(`you send id=${req.params.id}`)
})

// server.get("/cars", (req: Request, res: Response)=>{
//     // retrive the the car with id = req.params.id   
//     res.send(`[list of cars]`)
// })

// deals with html
server.get("/html", (request: Request, response: Response)=>{             
    const htmlFilePath = path.join(__dirname, "/htmls/index.html")    
    response.sendFile(htmlFilePath)
})


server.listen(3000, ()=>{console.log("listening on: http://localhost:3000");});
