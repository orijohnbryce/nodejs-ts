import { UploadedFile } from "express-fileupload";
import { saveImage } from "../utils/helpers";
import runQuery from "../db/dal";

export async function getProductImages(pid: number){
    const q = `SELECT image_path FROM product_image WHERE product_id=${pid};`;
    const res = await runQuery(q);
    return res.map((x)=>x.image_path);
}

export async function saveProductImage(product_id:number, image: UploadedFile) {
    
    const imageFileName = await saveImage(image);

    const q = `INSERT INTO product_image (product_id, image_path) 
               values (${product_id}, '${imageFileName}');`;

    const res = await runQuery(q);
    // TODO: make usre results are fine
    return imageFileName;
}