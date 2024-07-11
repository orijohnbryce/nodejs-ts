import express, { Request, Response } from "express";
import { readCars, writeCars } from "../dal/dal";
import CarModel from "../models/carModel";
import { getCarById, getCars } from "../services/carServices";

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
    const newCar: CarModel = {
      id: Date.now().toString(),
      ...req.body,
    };
    const cars = await readCars();
    cars.push(newCar);
    await writeCars(cars);
    res.status(201).send("new car created");
  } catch (error) {
    console.log("Error post new car. info: ", error);
    res.status(500).send("Failed to retrieve car, retry latter");
  }
});

carRoutes.put("/cars/:id", async (req, res) => {
  try {
    const cars = await readCars();
    const index = cars.findIndex((c) => String(c.id) === req.params.id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...req.body };
      await writeCars(cars);
      res.status(200).send("car updated!");
    } else {
      res.status(400).send("Car id not found");
    }
  } catch (error) {
    console.log("Error put car. info: ", error);
    res.status(500).send("Failed to update car, retry latter");
  }
});

carRoutes.delete("/cars/:id", async (req, res) => {
  try {
    const cars = await readCars();
    const filteredCars = cars.filter((c) => String(c.id) !== req.params.id);

    if (cars.length !== filteredCars.length) {
      await writeCars(filteredCars);
      res.status(204).send("car deleted");
    } else {
      res.status(400).send("Car not found to delete");
    }
  } catch (error) {
    console.log("Error delete car. info: ", error);
    res.status(500).send("Failed to delete car, retry latter");
  }
});
