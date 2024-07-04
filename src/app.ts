import express from "express";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import path from "path";

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, "db", "cars.csv");

app.use(express.json());

interface Car {
  id: string;
  name: string;
  km: number;
  engine: string;
  year: number;
  price: number;
}

async function readCars(): Promise<Car[]> {
  const data = await fs.readFile(dbPath, "utf-8");
  return parse(data, { columns: true, cast: true });
}

async function writeCars(cars: Car[]): Promise<void> {
  const data = stringify(cars, { header: true });
  await fs.writeFile(dbPath, data, "utf-8");
}

app.get("/cars", async (req, res) => {
  try {
    const cars = await readCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve car" + error });
  }
});

app.get("/cars/:id", async (req, res) => {
  try {
    const cars = await readCars();
      const car = cars.find((c) => {        
          return String(c.id) === req.params.id;
      });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve car" + error });
  }
});

app.post("/cars", async (req, res) => {
  try {
    const newCar: Car = {
      id: Date.now().toString(),
      ...req.body,
    };
    const cars = await readCars();
    cars.push(newCar);
    await writeCars(cars);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve car" + error });
  }
});

app.put("/cars/:id", async (req, res) => {
  try {
    const cars = await readCars();
    const index = cars.findIndex((c) => String(c.id) === req.params.id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...req.body };
      await writeCars(cars);
      res.json(cars[index]);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update car" });
  }
});

app.delete("/cars/:id", async (req, res) => {
  try {
    const cars = await readCars();
    const filteredCars = cars.filter((c) => c.id !== req.params.id);
    if (cars.length !== filteredCars.length) {
      await writeCars(filteredCars);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete car" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
