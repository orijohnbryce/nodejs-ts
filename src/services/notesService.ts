import { client, collection } from "../db/dal";
import { Note } from "../models/noteModel";
import { ObjectId } from 'mongodb';


export async function createNote(note: Note) {
    try {
        await client.connect();
        const res = await collection.insertOne(note);
        console.log(res);
    } catch (error) {
        console.log("create note error:", error);
    } finally {
        client.close();
    }
}

export async function readNotes(_id?: string): Promise<any> {
    try {
        await client.connect();
        let res: any;
        if (_id) {
            res = await collection.findOne({ _id: new ObjectId(_id) });
        } else {
            res = await collection.find({}).toArray();
        }
        return res;

    } catch (error) {
        console.log("read note error:", error);
        return null;
    } finally {
        client.close();
    }
}

export async function updateNote(_id: string, updatedFields: Partial<Note>, partial: boolean = true) {
    try {
        await client.connect();
        let res: any;
        if (partial) {
            res = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: updatedFields });
            console.log("updated. res:", res);
        } else {
            res = await collection.replaceOne({ _id: new ObjectId(_id) }, { $set: updatedFields });
            console.log("replaced. res:", res);
        }
    } catch (error) {
        console.log("update note error:", error);
    } finally {
        client.close();
    }
}

export async function deleteNote(_id: string) {
    try {
        await client.connect();
        const res = await collection.deleteOne({_id: new ObjectId(_id)});
        console.log(res);
    } catch (error) {
        console.log("delete note error:", error);
    } finally {
        client.close();
    }
}

// testing:
// createNote({'id': 6, 'title': 'new title', content: 'new content'});
// readNotes().then((res)=>{console.log(res);})
// readNotes("66fad3553f3c0c4e0b47ef4e").then((res)=>{console.log(res);})
// updateNote("66fad3553f3c0c4e0b47ef4e", {"title": "new title2"}).then(()=>{});
// deleteNote("66fad3553f3c0c4e0b47ef4e")