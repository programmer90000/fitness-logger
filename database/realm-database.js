import Realm from "realm";

const workoutPresets = {
    "name": "WorkoutPresets",
    "properties": {
        "id": "objectId",
        "name": "string",
        "done": "bool",
    },
    "primaryKey": "id",
};

const exercises = {
    "name": "Exercises",
    "properties": {
        "id": "objectId",
        "name": "string",
        "done": "bool",
    },
    "primaryKey": "id",
};

const openRealm = async () => {
    try {
        const realm = await Realm.open({ "database": [workoutPresets, exercises] });
        return realm;
    } catch (error) {
        console.error("Error opening Realm:", error);
        throw error; // Re-throw the error for handling in other files
    }
};

export default openRealm;
