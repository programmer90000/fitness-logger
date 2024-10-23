import Realm from "realm";
import { Alert } from "react-native";

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

const addExercise = (realm, exerciseName, exerciseType, exerciseNotes, exerciseVideo, setExercise, setExerciseName, setExerciseType, setExerciseNotes, setExerciseVideo, setIsLoading) => {
    setIsLoading(true);
    try {
        if (exerciseName.trim() === "") {
            Alert.alert("Error", "Exercise name is required!");
            return;
        }
        if (!exerciseType) {
            Alert.alert("Error", "Exercise type is required");
            return;
        }
        
        const existingExercise = realm.objects("Exercises").filtered(`name = "${exerciseName}"`)[0];
        if (existingExercise) {
            Alert.alert("Error", "Exercises name already exists");
            return;
        }

        const exerciseData = realm.objects("Exercises");
        const maxId = exerciseData.length > 0 ? exerciseData.max("id") : 0;

        realm.write(() => {
            realm.create("Exercises", {
                id: maxId + 1,
                name: exerciseName,
                type: exerciseType,
                notes: exerciseNotes,
                video: exerciseVideo
            });
            setExercise([...realm.objects("Exercises")]);  // Refresh the workout preset list
            setExerciseName("");
            setExerciseType("");
            setExerciseNotes("");
            setExerciseVideo(null);
        });
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const deleteExercise = (realm, exercise, setExercises, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!exercise) {
            Alert.alert("Error", "Exercise not found!");
            return;
        }
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this workout preset?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        setIsLoading(false);
                    },
                },
                {
                    text: "Delete",
                    onPress: () => {
                        realm.write(() => {
                            realm.delete(exercise);
                            setExercises([...realm.objects("Exercises")]);  // Refresh the workout preset list
                            setIsLoading(false);
                        });
                    },
                },
            ]
        );
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const editExercise = (realm, exercise, setExercise, exerciseName, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!exercise) {
            Alert.alert("Error", "Exercise not found!");
            return;
        }
        const editedExercise = realm.objects("Exercises").filtered(`id = ${exercise.id}`)[0];
        realm.write(() => { editedExercise.name = exerciseName; });
        if (!exerciseName) {
            Alert.alert("Error", "Exercise not found!");
            setIsLoading(false);
            return;
        }
        setExercise(realm.objects("Exercises").toJSON());  // Refresh the workout preset list
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
}

export { exercises, addExercise, deleteExercise, editExercise };