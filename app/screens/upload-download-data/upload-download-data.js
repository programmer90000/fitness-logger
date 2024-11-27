import { ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Realm from "realm";
import * as FileSystem from "expo-file-system";
import { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges } from "../../../database/realm-database.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const UploadDownloadData = () => {

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
    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Upload Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5" onPress = {downloadAllRecords}>
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Download Data</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default UploadDownloadData;
