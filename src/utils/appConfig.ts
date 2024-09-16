import dotenv from "dotenv"

// load enviroment variables
dotenv.config()

class BaseAppConfig {
    readonly routePrefix = "/api/v1";
    readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    readonly doormanKey = process.env.DOORMAN_KEY;
    readonly jwtSecrete = process.env.JWT_SECRET;
    readonly s3key = process.env.S3_KEY
    readonly s3secret = process.env.S3_SECRET
    readonly s3region = "us-east-1";
    readonly s3bucket = "orstore1";

}

class DevAppconfig extends BaseAppConfig {
    readonly port : number = 4000        
    readonly dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 3306,
        database: '',
    }
}

class ProdAppconfig extends BaseAppConfig {
    readonly port : number = 3000    
    readonly dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'aws://db:/localZone-use123123',
        port: 3309,
        database: 'store_prod',                
    }
}


export const appConfig = process.env.IS_PRODUCTION === "true"
    ? new ProdAppconfig()
    : new DevAppconfig();



