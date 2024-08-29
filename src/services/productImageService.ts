import { Pool } from 'mysql2/promise';
import path from 'path';
import fs from 'fs/promises';
import { UploadedFile } from 'express-fileupload';
import { saveImage } from '../utils/helpers';
import runQuery from '../db/dal';

export const getProductImages = async (pid: number): Promise<string[]> => {
    const q = `SELECT image_path FROM product_image WHERE product_id=${pid}`;
    const res = await runQuery(q);    
    return res.map((x)=> x.image_path);
}

export const saveProductImage = async (productId: number, image: UploadedFile): Promise<string> => {
    
    const imagePath = await saveImage(image);        
    const q = `INSERT INTO product_image (product_id, image_path) VALUES (${productId}, '${imagePath}')`;
    await runQuery(q);
    return imagePath;
};

