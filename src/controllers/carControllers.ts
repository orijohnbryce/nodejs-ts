import express, { Request, Response } from "express";
import { readCars, writeCars } from "../dal/dal";
import CarModel from "../models/carModel";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
} from "../services/carServices";

export const carRoutes = express.Router();

carRoutes.get("/cars", async (req: Request, res: Response) => {
  try {
    const cars = await getCars();
    res.status(200).json(cars);
  } catch (error) {
    console.log("Failed to retrieve car. info:", error);
    res.status(500).send("Failed to retrieve car. Retry latter");
  }
});

carRoutes.get("/cars/:id", async (req: Request, res: Response) => {
  try {
    const car = await getCarById(req.params.id);

    if (car) {
      res.status(200).json(car);
    } else {
      res.status(400).send("Car-id not found");
    }
  } catch (error) {
    console.log("Error get cars/id. info: ", error);
    res.status(500).send("Failed to retrieve car, retry latter");
  }
});

carRoutes.post("/cars", async (req: Request, res: Response) => {
  try {
    await createCar(req.body);
    res.status(201).send("new car created");
  } catch (error) {
    console.log("Error post new car. info: ", error);
    res.status(500).send("Failed to retrieve car, retry latter");
  }
});

carRoutes.put("/cars/", async (req, res) => {
  try {
    await updateCar(req.body);
  } catch (error) {
    // for knownError as "id not found", need to return status 4xx

    console.log("Error put car. info: ", error);
    res.status(500).send("Failed to update car, retry latter");
  }
});

carRoutes.delete("/cars/:id", async (req, res) => {
  try {
    await deleteCar(req.params.id);
  } catch (error) {
    // for knownError as "id not found", need to return status 4xx

    console.log("Error delete car. info: ", error);
    res.status(500).send("Failed to delete car, retry latter");
  }
});
