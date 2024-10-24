import Realm from "realm";
import { Alert } from "react-native";

const workoutPresets = {
    "name": "WorkoutPresets",
    "properties": {
        "id": "int",
        "name": { "type": "string", "maxLength": 50 },
        "notes": { "type": "string", "maxLength": 500 },
    },
    "primaryKey": "id",
};

const addWorkoutPreset = (realm, workoutPresetName, workoutPresetNotes, setWorkoutPresets, setWorkoutPresetName, setWorkoutPresetNotes, setIsLoading) => {
    setIsLoading(true);
    try {
        if (workoutPresetName.trim() === "") {
            Alert.alert("Error", "Workout preset name is required!");
            return;
        }
        
        const existingWorkoutPreset = realm.objects("WorkoutPresets").filtered(`name = "${workoutPresetName}"`)[0];
        if (existingWorkoutPreset) {
            Alert.alert("Error", "Workout name already exists");
            return;
        }

        const workoutPresetsData = realm.objects("WorkoutPresets");
        const maxId = workoutPresetsData.length > 0 ? workoutPresetsData.max("id") : 0;

        realm.write(() => {
            realm.create("WorkoutPresets", {
                "id": maxId + 1,
                "name": workoutPresetName,
                "notes": workoutPresetNotes,
            });
            setWorkoutPresets([...realm.objects("WorkoutPresets")]); // Refresh the workout preset list
            setWorkoutPresetName("");
            setWorkoutPresetNotes("");
        });
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const deleteWorkoutPreset = (realm, workoutPreset, setWorkoutPresets, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!workoutPreset) {
            Alert.alert("Error", "Workout preset not found!");
            return;
        }
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this workout preset?",
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
                            realm.delete(workoutPreset);
                            setWorkoutPresets([...realm.objects("WorkoutPresets")]); // Refresh the workout preset list
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

const editWorkoutPreset = (realm, workoutPreset, setWorkoutPresets, setIsLoading, workoutPresetName) => {
    setIsLoading(true);
    try {
        if (!workoutPreset) {
            Alert.alert("Error", "Workout preset not found!");
            return;
        }
        const editedWorkoutPreset = realm.objects("WorkoutPresets").filtered(`id = ${workoutPreset.id}`)[0];
        realm.write(() => { editedWorkoutPreset.name = workoutPresetName; });
        if (!editedWorkoutPreset) {
            Alert.alert("Error", "Workout preset not found!");
            setIsLoading(false);
            return;
        }
        setWorkoutPresets(realm.objects("WorkoutPresets").toJSON()); // Refresh the workout preset list
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

export { workoutPresets, addWorkoutPreset, deleteWorkoutPreset, editWorkoutPreset };
