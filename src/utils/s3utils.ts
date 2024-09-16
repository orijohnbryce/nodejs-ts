import { appConfig } from "./appConfig";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {Upload} from "@aws-sdk/lib-storage"
import { Readable } from "stream";
import fs from "fs";

async function uploadToS3_path(filepath: string, docName: string): Promise<void> {
    const accessKeyId = appConfig.s3key;
    const secretAccessKey = appConfig.s3secret;
    const region = appConfig.s3region;
    const bucket = appConfig.s3bucket;

    const s3client = new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey },
    });

    const fileStream = fs.createReadStream(filepath);

    const uploadParams = {
        Bucket: bucket,
        Key: "utils/"+docName,
        Body: fileStream,
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        const res = await s3client.send(command);
        console.log("File uploaded.", res);
    } catch (error) {
        console.log("Some Error during upload. info:", error);
    }
}
async function uploadToS3_readable(fileStream: Readable, docName: string): Promise<void> {
    const accessKeyId = appConfig.s3key;
    const secretAccessKey = appConfig.s3secret;
    const region = appConfig.s3region;
    const bucket = appConfig.s3bucket;

    const s3client = new S3Client();

    const upload = new Upload({
        client: s3client,
        params: {
            Bucket: bucket,
            Key: accessKeyId,
            Body: fileStream,
        }
    })
    

    const uploadParams = {
        Bucket: bucket,
        Key: "utils/"+docName,
        Body: fileStream,
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        const res = await s3client.send(command);
        console.log("File uploaded.", res);
    } catch (error) {
        console.log("Some Error during upload. info:", error);
    }
}

uploadToS3("C:\\Users\\jbt\\Desktop\\Ori\\nodejs_template\\src\\utils\\s3utils.ts", "s3utils.ts")