class AppConfig {
    // readonly dbHost = "mongodb://localhost:27017";
    readonly dbHost = "mongodb://mongo:27017";
    readonly dbName = "mydb";
    readonly dbCollection = "notes";
}

const appConfig = new AppConfig();
export default appConfig;
