import path from "path";
import dotenv from "dotenv"

dotenv.config();

class AppConfig {
    readonly port : number = 4000;
    readonly prodcutsImagesPrefix = path.resolve(__dirname, "..", "assets", "images");
    readonly routePrefix = "/api/v1";
    // readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly errorLogFile = path.resolve(__dirname, "..", "logs", "error.log");
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    readonly doormanKey = "rivka-token-temp-test-whatever";
    readonly jwtSecrete = "This is example for secrete key %^&#$%#B FGERT";
    readonly dbConfig = {
        host: process.env.DB_HOST,
        port: 3306,
        database: 'store',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
    readonly s3key = process.env.S3_KEY;
    readonly s3secret = process.env.S3_SECRET;
    readonly s3bucket = "orstore1";    
}

export const appConfig = new AppConfig()