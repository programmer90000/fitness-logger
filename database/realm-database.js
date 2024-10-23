import Realm from "realm";

const exercises = {
    "name": "Exercises",
    "properties": {
        "id": "objectId",
        "name": { "type": "string", "maxLength": 50 },
        "type": "string", // TODO: Add a dropdown picker for this field
        "notes": { "type": "string", "maxLength": 500 },
        "video": "binary", // TODO: Add a file picker to add videos to this field
    },
    "primaryKey": "id",
};

const workoutPresetsExercises = {
    "name": "WorkoutPresetsExercises",
    "properties": {
        "id": "objectId",
        "workoutPresets": { "type": "objectId", "link": "WorkoutPresets" },
        "exercises": { "type": "objectId", "link": "Exercises" },
    },
    "primaryKey": "id",
};

const previousWorkouts = {
    "name": "PreviousWorkouts",
    "properties": {
        "id": "objectId",
        "name": { "type": "string", "maxLength": 50 },
        "notes": { "type": "string", "maxLength": 500 },
        "date": "date", // TODO: Add a date picker for this field
        "badges": { "type": "list", "objectType": "Badges" },
        "goals": { "type": "list", "objectType": "Goals" },
    },
    "primaryKey": "id",
};

const previousWorkoutsExercises = {
    "name": "PreviousWorkoutsExercises",
    "properties": {
        "id": "objectId",
        "previousWorkouts": { "type": "objectId", "link": "PreviousWorkouts" },
        "exercises": { "type": "objectId", "link": "Exercises" },
    },
    "primaryKey": "id",
};

const badges = {
    "name": "Badges",
    "properties": {
        "id": "objectId",
        "image": "binary", // TODO: Add an image picker for this field
        "text": { "type": "string", "maxLength": 50 },
        "completed": "bool",
    },
    "primaryKey": "id",
};

const goals = {
    "name": "Goals",
    "properties": {
        "id": "objectId",
        "name": { "type": "string", "maxLength": 50 },
        "startDate": "date", // TODO: Add a date picker for this field
        "endDate": "date", // TODO: Add a date picker for this field
        "reminders": "date", // TODO: Add a date picker for this field
        "notes": { "type": "string", "maxLength": 500 },
    },
    "primaryKey": "id",
};

const openRealm = async () => {
    try {
        const realm = await Realm.open({ "database": [workoutPresets, exercises, previousWorkouts, badges, goals, workoutPresetsExercises, previousWorkoutsExercises] });
        return realm;
    } catch (error) {
        console.error("Error opening Realm:", error);
        throw error; // Re-throw the error for handling in other files
    }
};

// ! Each time I call this function, write the following line to close the database: realm.close();

export default openRealm;
