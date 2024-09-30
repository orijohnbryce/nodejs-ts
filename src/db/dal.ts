import { MongoClient } from "mongodb";
import appConfig from "../utils/appConfig";

export const client = new MongoClient(appConfig.dbHost);
export const db = client.db(appConfig.dbName);
export const collection = db.collection(appConfig.dbCollection);
