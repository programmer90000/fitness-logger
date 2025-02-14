import { ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Realm from "realm";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges } from "../../../database/realm-database.js";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";

const UploadDownloadData = () => {
    const [jsonData, setJsonData] = useState();
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    const downloadAllRecords = async () => {
        try {
            const realm = await Realm.open({ "schema": [workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges] });

            const workoutPresetsRecords = realm.objects("WorkoutPresets");
            const exercisesRecords = realm.objects("Exercises");
            const workoutPresetsExercisesRecords = realm.objects("WorkoutPresetsExercises");
            const previousWorkoutsRecords = realm.objects("PreviousWorkouts");
            const previousWorkoutsExercisesRecords = realm.objects("PreviousWorkoutsExercises");
            const goalsRecords = realm.objects("Goals");
            const badgesRecords = realm.objects("Badges");

            // Convert records to JSON and add indentation for readability
            const workoutPresetsJson = JSON.stringify(workoutPresetsRecords, null, 2);
            const exercisesJson = JSON.stringify(exercisesRecords, null, 2);
            const workoutPresetsExercisesJson = JSON.stringify(workoutPresetsExercisesRecords, null, 2);
            const previousWorkoutsJson = JSON.stringify(previousWorkoutsRecords, null, 2);
            const previousWorkoutsExercisesJson = JSON.stringify(previousWorkoutsExercisesRecords, null, 2);
            const goalsJson = JSON.stringify(goalsRecords, null, 2);
            const badgesJson = JSON.stringify(badgesRecords, null, 2);

            const fileContents = `{\n  "workoutPresets": ${workoutPresetsJson},\n  "exercises": ${exercisesJson},\n  "workoutPresetsExercises": ${workoutPresetsExercisesJson},\n  "previousWorkouts": ${previousWorkoutsJson},\n  "previousWorkoutsExercises": ${previousWorkoutsExercisesJson},\n  "goals": ${goalsJson},\n  "badges": ${badgesJson}\n}`;
            
            const fileName = "fitness-logger-database.json";
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            // Write the content to the app's local file system
            await FileSystem.writeAsStringAsync(fileUri, fileContents, { "encoding": FileSystem.EncodingType.UTF8 });

            // Request permission to access external storage
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (!permissions.granted) {
                Alert.alert("Permission Denied", "Unable to access the Downloads folder.");
                return;
            }

            const savedFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                fileName,
                "application/json",
            );

            await FileSystem.writeAsStringAsync(savedFileUri, fileContents, { "encoding": FileSystem.EncodingType.UTF8 });

            Alert.alert("File Saved", `File saved to: ${savedFileUri}`);
            
            realm.close();
        } catch (error) {
            console.error("Error writing and saving file:", error);
            Alert.alert("Save Failed", "Something went wrong.");
        }
    };
    const pickDocument = async () => {
        try {
            // Open the document picker to allow users to select a file
            const result = await DocumentPicker.getDocumentAsync({
                "type": "application/json",
            });
            
            if (result.assets[0].mimeType === "application/json") {
                const fileUri = result.assets[0].uri;
                const fileContent = await FileSystem.readAsStringAsync(fileUri);
                const parsedData = JSON.parse(fileContent);
                setJsonData(parsedData);
                const { "badges": badgesArray = [], "goals": goalsArray = [], "exercises": exercisesArray = [], "previousWorkouts": previousWorkoutsArray = [], previousWorkoutsExercises = [], "workoutPresets": workoutPresetsArray = [], workoutPresetsExercises = [] } = parsedData;

                badgesArray.forEach((badge) => {
                    delete badge.id;
                    console.log("Badge:", badge);
                    const realm = new Realm({ "schema": [badges] });
                    realm.write(() => {
                        const currentHighestId = realm.objects("Badges").max("id") || 0;
                        const newId = currentHighestId + 1;
                        let completedString = badge.properties.completed;
                        let completed;

                        if (completedString === "true") { completed = true; } else { completed = false; }

                        realm.create("Badges", { "id": newId, "goalName": badge.properties.goalName, "exerciseName": badge.properties.exerciseName, "image": badge.properties.image, "details": badge.properties.details, "completed": completed });
                    });
                    realm.close();
                });
         
                goalsArray.forEach((goal) => {
                    delete goal.id;
                    console.log("Goal:", goal);
                    const realm = new Realm({ "schema": [goals] });
                    realm.write(() => {
                        const startDate = new Date(goal.startDate);
                        const endDate = new Date(goal.endDate);
                        const reminderDate = new Date(goal.reminders);

                        const existingGoal = realm.objects("Goals").filtered("name = $0 AND type = $1 AND value = $2 AND startDate = $3 AND endDate = $4 AND reminders = $5 AND notes = $6", goal.name, goal.type, goal.value, startDate, endDate, reminderDate, goal.notes);

                        if (existingGoal.length === 0) {
                            const currentHighestId = realm.objects("Goals").max("id") || 0;
                            const newId = currentHighestId + 1;
                        
                            realm.create("Goals", { "id": newId, "name": goal.name, "type": goal.type, "value": goal.value, "startDate": new Date(goal.startDate), "endDate": new Date(goal.endDate), "reminders": new Date(goal.reminders), "notes": goal.notes });
                        }
                    });
                });
                
                exercisesArray.forEach((exercise) => {
                    delete exercise.id;
                    console.log("Exercise:", exercise);
                    const realm = new Realm({ "schema": [exercises] });
                    realm.write(() => {
                        const currentHighestId = realm.objects("Exercises").max("id") || 0;
                        const newId = currentHighestId + 1;
                        realm.create("Exercises", { "id": newId, "name": exercise.name, "type": exercise.type, "notes": exercise.notes, "video": exercise.video, "personalBest": exercise.personalBest });
                    });
                });
                
                previousWorkoutsArray.forEach((previousWorkout) => {
                    delete previousWorkout.id;
                    console.log("Previous Workout:", previousWorkout);
                    const realm = new Realm({ "schema": [previousWorkouts] });
                    realm.write(() => {
                        const currentHighestId = realm.objects("PreviousWorkouts").max("id") || 0;
                        const newId = currentHighestId + 1;
                        realm.create("PreviousWorkouts", { "id": newId, "name": previousWorkout.name, "notes": previousWorkout.notes, "date": new Date(previousWorkout.date) });
                    });
                });
                
                previousWorkoutsExercises.forEach((previousWorkoutExercise) => {
                    delete previousWorkoutExercise.id;
                    console.log("Previous Workout Exercise:", previousWorkoutExercise);
                    const realm = new Realm({ "schema": [previousWorkoutsExercises] });
                    realm.write(() => {
                        const currentHighestId = realm.objects("PreviousWorkoutsExercises").max("id") || 0;
                        const newId = currentHighestId + 1;
                        realm.create("PreviousWorkoutsExercises", { "id": newId, "previousWorkouts": previousWorkoutExercise.previousWorkouts, "exercises": previousWorkoutExercise.exercises });
                    });        
                });
                
                workoutPresetsArray.forEach((workoutPreset) => {
                    delete workoutPreset.id;
                    console.log("Workout Preset:", workoutPreset);
                    const realm = new Realm({ "schema": [workoutPresets] });
                    realm.write(() => {
                        const currentHighestId = realm.objects("WorkoutPresets").max("id") || 0;
                        const newId = currentHighestId + 1;
                        realm.create("WorkoutPresets", { "id": newId, "name": workoutPreset.name, "notes": workoutPreset.notes });
                    });
                    realm.close();
                });
                
                workoutPresetsExercises.forEach((workoutPresetExercise) => {
                    delete workoutPresetExercise.id;
                    console.log("Workout Preset Exercise:", workoutPresetExercise);
                    const realm = new Realm({ "schema": [workoutPresetsExercises] });
                    realm.write(() => {
                        const currentHighestId = realm.objects("WorkoutPresetsExercises").max("id") || 0;
                        const newId = currentHighestId + 1;
                        realm.create("WorkoutPresetsExercises", { "id": newId, "workoutPresets": workoutPresetExercise.workoutPresets, "exercises": workoutPresetExercise.exercises, "metrics": workoutPresetExercise.metrics, "volume": workoutPresetExercise.volume });
                    });
                    realm.close();
                });
                
            } else {
                setError("No document selected");
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5" onPress = {pickDocument}>
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Upload Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5" onPress = {downloadAllRecords}>
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Download Data</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default UploadDownloadData;
