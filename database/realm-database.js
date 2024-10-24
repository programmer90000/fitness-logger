import Realm from "realm";

const workoutPresetsExercises = {
    "name": "WorkoutPresetsExercises",
    "properties": {
        "id": "objectId",
        "workoutPresets": { "type": "objectId", "link": "WorkoutPresets" },
        "exercises": { "type": "objectId", "link": "Exercises" },
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
