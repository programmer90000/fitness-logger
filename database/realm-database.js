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

const previousWorkouts = {
    "name": "PreviousWorkouts",
    "properties": {
        "id": "objectId",
        "name": "string",
        "done": "bool",
    },
    "primaryKey": "id",
};

const badges = {
    "name": "Badges",
    "properties": {
        "id": "objectId",
        "name": "string",
        "done": "bool",
    },
    "primaryKey": "id",
};

const goals = {
    "name": "Goals",
    "properties": {
        "id": "objectId",
        "name": "string",
        "done": "bool",
    },
    "primaryKey": "id",
};

const openRealm = async () => {
    try {
        const realm = await Realm.open({ "database": [workoutPresets, exercises, previousWorkouts, badges, goals] });
        return realm;
    } catch (error) {
        console.error("Error opening Realm:", error);
        throw error; // Re-throw the error for handling in other files
    }
};

// ! Each time I call this function, write the following line to close the database: realm.close();

export default openRealm;
