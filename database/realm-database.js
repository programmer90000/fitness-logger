import Realm from "realm";

// Define your schema
const database = {
    "name": "Task",
    "properties": {
        "id": "objectId",
        "name": "string",
        "done": "bool",
    },
    "primaryKey": "_id",
};

const openRealm = async () => {
    try {
        const realm = await Realm.open({ "database": [database] });
        return realm;
    } catch (error) {
        console.error("Error opening Realm:", error);
        throw error; // Re-throw the error for handling in other files
    }
};

export default openRealm;
