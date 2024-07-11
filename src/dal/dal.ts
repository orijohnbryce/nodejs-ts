import { appConfig } from "../utils/config";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import Car from "../models/carModel";

export async function readCars(): Promise<Car[]> {
    const data = await fs.readFile(appConfig.dbPath, "utf-8");
    return parse(data, { columns: true, cast: true });
}

export async function writeCars(cars: Car[]): Promise<void> {
    const data = stringify(cars, { header: true });
    await fs.writeFile(appConfig.dbPath, data, "utf-8");
}
