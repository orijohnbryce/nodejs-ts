import path from "path";


class AppConfig {
    readonly port: number = 3000
    readonly dbPath: string = path.join(__dirname, "../db", "cars.csv");
}


export const appConfig = new AppConfig();