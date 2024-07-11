import express from "express";
import { appConfig } from "./utils/config";
import { carRoutes } from "./controllers/carControllers";

const app = express();

// register the controllers to the app object.

app.use(express.json()); // load body

app.use("/", carRoutes)

// app.use("/", productRoutes)

app.listen(appConfig.port, () => {
    console.log(`Server running at http://localhost:${appConfig.port}`);
});
