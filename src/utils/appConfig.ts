import dotenv from "dotenv"

// load enviroment variables
dotenv.config()

class BaseAppConfig {
    readonly routePrefix = "/api/v1";
    readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    readonly doormanKey = process.env.DOORMAN_KEY;
    readonly jwtSecrete = process.env.JWT_SECRET;

    readonly dbConfig = {               
        user: "avnadmin",
        password: ""
    }

}

class DevAppconfig extends BaseAppConfig {
    readonly port : number = 4000        
    readonly dbConfig = {
        ...this.dbConfig,
        host: 'ori-mysql-ori-proj.i.aivencloud.com',
        port: 28550,
        database: 'defaultdb',
    }
}

class ProdAppconfig extends BaseAppConfig {
    readonly port : number = 443    
    readonly dbConfig = {
        ...this.dbConfig,
        host: 'aws://db:/localZone-use123123',
        port: 3309,
        database: 'store_prod',                
    }
}


export const appConfig = process.env.IS_PRODUCTION === "true"
    ? new ProdAppconfig()
    : new DevAppconfig();



