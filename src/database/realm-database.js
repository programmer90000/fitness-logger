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

const exercises = {
    "name": "Exercises",
    "properties": {
        "id": "int",
        "name": "string",
        "type": "string",
        "notes": "string",
        "video": "string",
        "personalBest": "string",
        "isDeleted": { "type": "bool", "default": false },
        "primaryMuscles": "string[]",
        "secondaryMuscles": "string[]",
    },
    "primaryKey": "id",
};

const workoutPresetsExercises = {
    "name": "WorkoutPresetsExercises",
    "properties": {
        "id": "int",
        "workoutPresets": "WorkoutPresets",
        "exercises": "Exercises",
        "metrics": "string", // For Example, weight size
        "volume": "string", // For Example, number of reps
    },
    "primaryKey": "id",
};

const previousWorkouts = {
    "name": "PreviousWorkouts",
    "properties": {
        "id": "int",
        "name": "string",
        "notes": "string",
        "date": "date", // TODO: Add a date picker for this field
    },
    "primaryKey": "id",
};

const previousWorkoutsExercises = {
    "name": "PreviousWorkoutsExercises",
    "properties": {
        "id": "int",
        "previousWorkouts": "PreviousWorkouts",
        "exercises": "Exercises",
        "metrics": "string", // For Example, weight size
        "volume": "string", // For Example, number of reps
    },
    "primaryKey": "id",
};

const goals = {
    "name": "Goals",
    "properties": {
        "id": "int",
        "name": "string",
        "type": "string",
        "value": "string",
        "startDate": "date",
        "endDate": "date",
        "reminders": "date",
        "notes": "string",
    },
    "primaryKey": "id",
};

const badges = {
    "name": "Badges",
    "properties": {
        "id": "int",
        "image": "string", // TODO: Add an image picker for this field
        "text": "string",
        "completed": "bool",
    },
    "primaryKey": "id",
};

export { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges };
