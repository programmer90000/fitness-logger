import Realm from "realm";

const initialBadges = [
    // { id: 1, image: "path/to/badge1.png", text: "Badge 1", completed: false },
    // { id: 2, image: "path/to/badge2.png", text: "Badge 2", completed: false },
];

const toggleBadgeCompletion = (realm, badgeId, setBadges) => {
    try {
        const badge = realm.objects("Badges").filtered(`id = ${badgeId}`)[0];
        if (!badge) {
            Alert.alert("Error", "Badge not found!");
            return;
        }

        realm.write(() => {
            badge.completed = !badge.completed;
            setBadges([...realm.objects("Badges")]); // Refresh the badges list
        });
    } catch (error) {
        Alert.alert("Error", error.message);
    }
};

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
    },
    "primaryKey": "id",
};

const goals = {
    "name": "Goals",
    "properties": {
        "id": "int",
        "name": "string",
        "startDate": "date", // TODO: Add a date picker for this field
        "endDate": "date", // TODO: Add a date picker for this field
        "reminders": "date", // TODO: Add a date picker for this field
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
export { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges, toggleBadgeCompletion };
