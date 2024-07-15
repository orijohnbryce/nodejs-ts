import express from "express";
import { appConfig } from "./utils/config";
import { carRoutes } from "./controllers/carControllers";
import logMiddleware from "./middlewares/logMidddleware";

const app = express();

app.use("/", logMiddleware)

app.use(express.json()); // load body

app.use("/", carRoutes)

app.listen(appConfig.port, () => {
    console.log(`Server running at http://localhost:${appConfig.port}`);
});
