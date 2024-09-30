import { client, collection } from "./dal";

async function createData() {
    try {
        await client.connect();
        console.log("Connected");

        // insert single record
        const newRecord = { "id": 0, "title": "title1", "content": "content1" };
        let res:any = await collection.insertOne(newRecord);
        console.log(res);

        // insert many records:
        const recoreds = [
            { "id": 1, "title": "title1", "content": "content1" },
            { "id": 2, "title": "title2", "content": "content2" },
            { "id": 3, "title": "title3", "content": "content3" },
            { "id": 4, "title": "title4", "content": "content4" },
            { "id": 5, "title": "title5", "content": "content5" },
        ]
        res = await collection.insertMany(recoreds);
        console.log("many records created. amount: ", Object.keys(res.insertedIds).length);
        
    } catch (error) {
        console.log("Error during createData", error);
    } finally {
        await client.close();
        console.log("db-client disconnected");
    }
}

createData();
