import { appConfig } from "./appConfig";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";

function getS3client() {
    const accessKeyId = appConfig.s3key;
    const secretAccessKey = appConfig.s3secret;
    const region = "us-east-1";

    return new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    })

}

async function uploadS3ByPath(filePath: string) {

    const s3client = getS3client();
    const bucketName = appConfig.s3bucket;

    const filename = path.basename(filePath)
    const fileStream = fs.createReadStream(filePath)

    const uploadParams = {
        Bucket: bucketName,
        Key: filename,
        Body: fileStream
    }

    try {
        const command = new PutObjectCommand(uploadParams)
        const res = await s3client.send(command);
        console.log("file uploaded");
        console.log(res);
    } catch (error) {
        console.log("Some error during uploading file. more info:");
        console.log(error);
        // throw error;
    }
}

async function deleteFromS3(docName: string): Promise<void> {

    const bucketName = appConfig.s3bucket;
    const s3client = getS3client();

    const deleteParams = {
        Bucket: bucketName,
        Key: docName,
    }
    try {
        const command = new DeleteObjectCommand(deleteParams);
        const res = await s3client.send(command);
        console.log("Document deleted!");
        console.log(res);
    } catch (error) {
        console.log("Some error during deleting file. more info:");
        console.log(error);
    }
}

export async function uploadS3ByStream(fileStream: Readable, docName: string) {
    const s3client = getS3client();
    const uploadParams = {
        Bucket: appConfig.s3bucket,
        Key: docName,
        Body: fileStream
    }

    const upload = new Upload({
        client: s3client,
        params: uploadParams,
    });

    try {
        const res = await upload.done();
        console.log("Uploaded successfully!");
        console.log(res);

    } catch (error) {
        console.log("Some error during uploading file. more info:");
        console.log(error);
    }
}
