import Realm from "realm";

const workoutPresets = {
    "name": "WorkoutPresets",
    "properties": {
        "id": "int",
        "name": "string",
        "notes": "string",
    },
    "primaryKey": "id",
};

const workoutPresetsExercises = {
    "name": "WorkoutPresetsExercises",
    "properties": {
        "id": "int",
        "workoutPresets": "WorkoutPresets",
        "exercises": "Exercises",
    },
    "primaryKey": "id",
};

const previousWorkoutsExercises = {
    "name": "PreviousWorkoutsExercises",
    "properties": {
        "id": "int",
        "previousWorkouts": "PreviousWorkouts",
        "exercises": "Exercises",
    },
    "primaryKey": "id",
};

const openRealm = async () => {
    try {
        const realm = await Realm.open({ "database": [workoutPresetsExercises, previousWorkoutsExercises] });
        return realm;
    } catch (error) {
        console.error("Error opening Realm:", error);
        throw error; // Re-throw the error for handling in other files
    }
};

// ! Each time I call this function, write the following line to close the database: realm.close();

export default openRealm;
export { workoutPresets, workoutPresetsExercises, previousWorkoutsExercises };
