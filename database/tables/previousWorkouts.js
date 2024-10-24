import Realm from "realm";
import { Alert } from "react-native";

const previousWorkouts = {
    "name": "PreviousWorkouts",
    "properties": {
        "id": "int",
        "name": { "type": "string", "maxLength": 50 },
        "notes": { "type": "string", "maxLength": 500 },
        "date": "date", // TODO: Add a date picker for this field
    },
    "primaryKey": "id",
};

const addWorkout = (realm, workoutName, workoutNotes, workoutDate, setPreviousWorkouts, setWorkoutName, setWorkoutNotes, setWorkoutDate) => {
    setIsLoading(true);
    try {
        if (workoutName.trim() === "") {
            Alert.alert("Error", "Workout name is required!");
            return;
        }
        if (!workoutDate) {
            Alert.alert("Error", "Workout date is required");
            return;
        }

        const workoutData = realm.objects("PreviousWorkouts");
        const maxId = workoutData.length > 0 ? workoutData.max("id") : 0;

        realm.write(() => {
            realm.create("Goals", {
                "id": maxId + 1,
                "name": workoutName,
                "notes": workoutNotes,
                "date": workoutDate,
            });
            setPreviousWorkouts([...realm.objects("PreviousWorkouts")]); // Refresh the PreviousWorkouts list
            setWorkoutName("");
            setWorkoutNotes("");
            setWorkoutDate("");
        });
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const deleteWorkout = (realm, previousWorkout, setPreviousWorkout, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!previousWorkout) {
            Alert.alert("Error", "Previous workout not found!");
            return;
        }
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this workout?",
            [
                {
                    "text": "Cancel",
                    "onPress": () => {
                        setIsLoading(false);
                    },
                },
                {
                    "text": "Delete",
                    "onPress": () => {
                        realm.write(() => {
                            realm.delete(previousWorkout);
                            setPreviousWorkout([...realm.objects("PreviousWorkouts")]); // Refresh the PreviousWorkouts list
                            setIsLoading(false);
                        });
                    },
                },
            ],
        );
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const editPreviousWorkout = (realm, previousWorkout, setPreviousWorkout, previousWorkoutName, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!previousWorkout) {
            Alert.alert("Error", "Previous Workout not found!");
            return;
        }
        const editedPreviousWorkout = realm.objects("PreviousWorkouts").filtered(`id = ${previousWorkout.id}`)[0];
        realm.write(() => { editedPreviousWorkout.name = previousWorkoutName; });
        if (!previousWorkoutName) {
            Alert.alert("Error", "Previous Workout not found!");
            setIsLoading(false);
            return;
        }
        setGoal(realm.objects("PreviousWorkouts").toJSON()); // Refresh the PreviousWorkouts list
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

export { previousWorkouts, addWorkout, deleteWorkout, editPreviousWorkout };
