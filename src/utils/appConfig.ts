class AppConfig {
    readonly port : number = 4000
    readonly routePrefix = "/api/v1";
    readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";    
    
    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'park',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig()