import { ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges } from "../../../database/realm-database.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const UploadDownloadData = () => {
    const downloadTestFile = async () => {
        try {
            const fileName = "fitness-logger-database.json";
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;
            const fileContents = `[\n${JSON.stringify(workoutPresets)},\n${JSON.stringify(exercises)},\n${JSON.stringify(workoutPresetsExercises)},\n${JSON.stringify(previousWorkouts)},\n${JSON.stringify(previousWorkoutsExercises)},\n${JSON.stringify(goals)},\n${JSON.stringify(badges)}\n]`;

            // Write content
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
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5" onPress = {downloadTestFile}>
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Download Data</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default UploadDownloadData;
