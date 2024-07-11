import { readCars } from "../dal/dal";
import CarModel from "../models/carModel";

export async function getCars(
  minPrice: number = 0,
  maxPrice: number = Infinity,
  search: string = ""
): Promise<CarModel[]> {
  let cars = await readCars();

  // filter out some cars if filter added.
  cars = cars.filter((c) => {
    if (c.price < minPrice) return false;
    if (c.price > maxPrice) return false;
    if (!c.name.includes(search)) return false;

    return true;
  });
  return cars;
}

export async function getCarById(id: string): Promise<CarModel | undefined> {
  const cars = await readCars();

  // search for specific car with the provided id
  const car = cars.find((c) => {
    return String(c.id) === id;
  });
      
  return car;
}

export async function createCar(car: CarModel): Promise<void> {
    
}

export async function updateCar(car: CarModel): Promise<void> {
    
}

export async function deleteCar(id: string): Promise<void> {
    
}