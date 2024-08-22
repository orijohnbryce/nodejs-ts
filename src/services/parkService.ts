import runQuery from "../db/dal";
import { ResultSetHeader } from "mysql2";


type parkData = {
    id: number;
    isOccupied: boolean;
    isFree: boolean;
    city: string;
    street: string;    
    num: number;
}

export async function getParks(): Promise<parkData[]> {
    let q = `SELECT park.id, park.isOccupied, park.isFree, address.city, address.street, address.num FROM park JOIN address ON park.address_id = address.id;`;
    const parks = await runQuery(q);
    return parks
}

export async function updateOccupied(id: number, newValue: boolean) {
    let q = `UPDATE park SET isOccupied= ${newValue} WHERE id=${id};`;
    const res = (await runQuery(q)) as ResultSetHeader | any;
    if (res.affectedRows === 0){
        console.log("Warning: try to update non-exists park");        
    }    
}

// updateOccupied(100, false).then(()=>{console.log("Done");
// })