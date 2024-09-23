import runQuery from "../db/dal";
import { promises as fs } from "fs";
import { appConfig } from "./appConfig";
import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";
import { Readable } from "stream";
import { uploadS3ByStream } from "./s3utils";

export async function isDbServerUp() {    
    try {
        await runQuery("select id from product where id=0;");
        return true;
    } catch (error) {
        return false;        
    }
}

async function writeToFile(filepath: string, content: string) {
    await fs.appendFile(filepath, content + "\n");
}

export async function writeErrorLog(errMsg: string) {    
    writeToFile(appConfig.errorLogFile, errMsg);
}

export async function writeAccessLog(msg: string) {
    writeToFile(appConfig.accessLogFile, msg);
}

// export async function saveImage(image: UploadedFile) {    
//     const extension = image.name.substring( image.name.lastIndexOf("."))
//     const filename = uuid() + extension;
//     const fullpath = path.join(appConfig.prodcutsImagesPrefix, filename);
//     await image.mv(fullpath);
//     return filename;
// }

export async function saveImage(image:UploadedFile) {
    const extension = image.name.substring( image.name.lastIndexOf("."))
    const filename = uuid() + extension;
    const fileStream = Readable.from(image.data);
    await uploadS3ByStream(fileStream, filename)
    return filename;
}