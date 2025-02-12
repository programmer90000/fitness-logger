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

                const recordExists = (realm, schemaName, record, uniqueFields) => {
                    const query = uniqueFields.map((field) => { return `${field} == $${field}`; }).join(" AND ");
                    const queryParams = {};
                    uniqueFields.forEach((field) => {
                        queryParams[field] = record[field];
                    });
                    return realm.objects(schemaName).filtered(query, queryParams).length > 0;
                };

                badgesArray.forEach((badge) => {
                    const realm = new Realm({ "schema": [badges] });
                    const exists = recordExists(realm, "Badges", badge.properties, ["goalName", "exerciseName"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("Badges").max("id") || 0;
                            const newId = currentHighestId + 1;
                            let completedString = badge.properties.completed;
                            let completed;

                            if (completedString === "true") { completed = true; } else { completed = false; }
                            realm.create("Badges", { "id": newId, "goalName": badge.properties.goalName, "exerciseName": badge.properties.exerciseName, "image": badge.properties.image, "details": badge.properties.details, "completed": completed });
                        });
                    }
                    realm.close();
                });
     
                goalsArray.forEach((goal) => {
                    const realm = new Realm({ "schema": [goals] });
                    const exists = recordExists(realm, "Goals", goal, ["name", "type", "value"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("Goals").max("id") || 0;
                            const newId = currentHighestId + 1;
                            realm.create("Goals", { "id": newId, "name": goal.name, "type": goal.type, "value": goal.value, "startDate": new Date(goal.startDate), "endDate": new Date(goal.endDate), "reminders": new Date(goal.reminders), "notes": goal.notes });
                        });
                    }
                    realm.close();
                });
            
                exercisesArray.forEach((exercise) => {
                    const realm = new Realm({ "schema": [exercises] });
                    const exists = recordExists(realm, "Exercises", exercise, ["name", "type"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("Exercises").max("id") || 0;
                            const newId = currentHighestId + 1;
                            realm.create("Exercises", { "id": newId, "name": exercise.name, "type": exercise.type, "notes": exercise.notes, "video": exercise.video, "personalBest": exercise.personalBest });
                        });
                    }
                    realm.close();
                });
            
                previousWorkoutsArray.forEach((previousWorkout) => {
                    const realm = new Realm({ "schema": [previousWorkouts] });
                    const exists = recordExists(realm, "PreviousWorkouts", previousWorkout, ["name", "date"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("PreviousWorkouts").max("id") || 0;
                            const newId = currentHighestId + 1;
                            realm.create("PreviousWorkouts", { "id": newId, "name": previousWorkout.name, "notes": previousWorkout.notes, "date": new Date(previousWorkout.date) });
                        });
                    }
                    realm.close();
                });
            
                previousWorkoutsExercises.forEach((previousWorkoutExercise) => {
                    const realm = new Realm({ "schema": [previousWorkoutsExercises] });
                    const exists = recordExists(realm, "PreviousWorkoutsExercises", previousWorkoutExercise, ["previousWorkouts", "exercises"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("PreviousWorkoutsExercises").max("id") || 0;
                            const newId = currentHighestId + 1;
                            realm.create("PreviousWorkoutsExercises", { "id": newId, "previousWorkouts": previousWorkoutExercise.previousWorkouts, "exercises": previousWorkoutExercise.exercises });
                        });
                    }
                    realm.close();
                });
            
                workoutPresetsArray.forEach((workoutPreset) => {
                    const realm = new Realm({ "schema": [workoutPresets] });
                    const exists = recordExists(realm, "WorkoutPresets", workoutPreset, ["name"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("WorkoutPresets").max("id") || 0;
                            const newId = currentHighestId + 1;
                            realm.create("WorkoutPresets", { "id": newId, "name": workoutPreset.name, "notes": workoutPreset.notes });
                        });
                    }
                    realm.close();
                });
            
                workoutPresetsExercises.forEach((workoutPresetExercise) => {
                    const realm = new Realm({ "schema": [workoutPresetsExercises] });
                    const exists = recordExists(realm, "WorkoutPresetsExercises", workoutPresetExercise, ["workoutPresets", "exercises"]);
                    if (!exists) {
                        realm.write(() => {
                            const currentHighestId = realm.objects("WorkoutPresetsExercises").max("id") || 0;
                            const newId = currentHighestId + 1;
                            realm.create("WorkoutPresetsExercises", { "id": newId, "workoutPresets": workoutPresetExercise.workoutPresets, "exercises": workoutPresetExercise.exercises, "metrics": workoutPresetExercise.metrics, "volume": workoutPresetExercise.volume });
                        });
                    }
                    realm.close();
                });
            
                Alert.alert("Success", "Data imported successfully");
            } else {
                Alert.alert("Error", "Please select a JSON file");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to import data");
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
