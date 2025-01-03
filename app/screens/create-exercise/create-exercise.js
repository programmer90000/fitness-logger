import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import UploadMedia from "../../components/upload-media/upload-media.js";
import { exercises } from "../../../database/realm-database.js";
import { useTheme } from "../../hooks/useTheme.js";
import Realm from "realm";
import { colours } from "../../constants/colours.js";

const CreateExercise = () => {
    const { control, getValues, reset } = useForm({});
    const [exerciseState, setExerciseState] = useState({
        "exerciseName": "",
        "exerciseType": null,
        "exerciseNotes": "",
        "videoPath": null,
    });
    
    const exerciseType = [
        { "label": "Reps", "value": "reps" },
        { "label": "Weight/ Reps", "value": "weightAndReps" },
        { "label": "Distance/ Time", "value": "distanceAndTime" },
    ];
    
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }
    
    const handleAddExercise = () => {
        const realm = new Realm({ "schema": [exercises] });
        realm.write(() => {
            const currentHighestId = realm.objects("Exercises").max("id") || 0;
            let newId;

            if (currentHighestId === 0)
            {
                newId = 1;
            } else {
                newId = currentHighestId + 1;
            }
            
            realm.create("Exercises", { "id": newId, "name": exerciseState.exerciseName, "type": exerciseState.exerciseType, "notes": exerciseState.exerciseNotes, "video": exerciseState.videoPath, "personalBest": "N/A" });
        });
        const allExercises = realm.objects("Exercises");
        realm.close();
        
        reset();
        setExerciseState({
            "exerciseName": "",
            "exerciseType": null,
            "exerciseNotes": "",
            "videoPath": null,
        });
    };

    const updateExerciseState = (field, value) => {
        setExerciseState((prev) => { return {
            ...prev,
            [field]: value,
        }; });
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Exercise Name</Text>
                <Controller
                    control = {control}
                    name = "exerciseName"
                    render = {({ "field": { onChange, onBlur, value } }) => {
                        return (
                            <TextInput onBlur = {onBlur} onChangeText = {(text) => {
                                onChange(text);
                                updateExerciseState("exerciseName", text);
                            }} value = {exerciseState.exerciseName} className = {"align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"} />
                        ); }}
                />
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Exercise Type</Text>
                <DropdownComponent
                    data = {exerciseType} value = {exerciseState.exerciseType} onChange = {(value) => { return updateExerciseState("exerciseType", value); }} placeholderStyle = {{ "color": colours.button_text_1 }} selectedTextStyle = {{ "color": colours.button_text_1 }} />
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Exercise Notes</Text>
                <Controller
                    control = {control}
                    name = "exerciseNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => {
                        return (
                            <TextInput onBlur = {onBlur} onChangeText = {(text) => {
                                onChange(text);
                                updateExerciseState("exerciseNotes", text);
                            }} value = {exerciseState.exerciseNotes} multiline = {true} numberOfLines = {3} className = {"align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"} />
                        ); }}
                />       
                <UploadMedia onMediaSelect = {(path) => { return updateExerciseState("videoPath", path); }} mediaFileName = {`${exerciseState.exerciseName}.mp4`} mediaType = "Video" />
                <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px]" onPress = {handleAddExercise}>
                    <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-3xl">Add Exercise</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreateExercise;
