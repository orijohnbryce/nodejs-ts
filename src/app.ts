import express, { Request, Response } from "express";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import path from "path";

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, "db", "cars.csv");

app.use(express.json()); // load body

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

app.get("/cars", async (req: Request, res: Response) => {
    try {
        const cars = await readCars();
        res.json(cars);
    } catch (error) {
        console.log("Failed to retrieve car. info:", error);
        res.send("Failed to retrieve car. Retry latter");
    }
});

app.get("/cars/:id", async (req: Request, res: Response) => {
    try {
        const cars = await readCars();

        // search for specific car with the provided id
        const car = cars.find((c) => {
            return String(c.id) === req.params.id;
        });
        if (car) {
            res.json(car);
        } else {
            res.send("Car-id not found");
        }
    } catch (error) {
        console.log("Error get cars/id. info: ", error);        
        res.send("Failed to retrieve car, retry latter");
    }
});

app.post("/cars", async (req: Request, res: Response) => {
    try {
        const newCar: Car = {
            id: Date.now().toString(),
            ...req.body,
        };
        const cars = await readCars();
        cars.push(newCar);
        await writeCars(cars);
        res.send("new car created");
    } catch (error) {
        console.log("Error post new car. info: ", error);
        res.send("Failed to retrieve car, retry latter");
    }
});

app.put("/cars/:id", async (req, res) => {
    try {
        const cars = await readCars();
        const index = cars.findIndex((c) => String(c.id) === req.params.id);
        if (index !== -1) {
            cars[index] = { ...cars[index], ...req.body };
            await writeCars(cars);
            res.send("car updated!");
        } else {
            res.send("Car id not found");
        }
    } catch (error) {
        console.log("Error put car. info: ", error);
        res.send("Failed to update car, retry latter");
    }
});

app.delete("/cars/:id", async (req, res) => {
    try {
        const cars = await readCars();
        const filteredCars = cars.filter((c) => String(c.id) !== req.params.id);        
        
        if (cars.length !== filteredCars.length) {
            await writeCars(filteredCars);
            res.send("car deleted");
        } else {
            res.send("Car not found to delete");
        }
    } catch (error) {
        console.log("Error delete car. info: ", error);
        res.send("Failed to delete car, retry latter");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
