import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import UploadMedia from "../../components/upload-media/upload-media.js";
import { exercises } from "../../../database/realm-database.js";
import { useSettings } from "../settings/settings.js";
import Realm from "realm";
import { colours } from "../../constants/colours.js";

const CreateExercise = () => {
    const { control, getValues } = useForm({});
    const [exerciseName, setExerciseName] = useState("");
    const [selectedExerciseType, setselectedExerciseType] = useState(null);
    const [videoPath, setVideoPath] = useState(null);
    const { theme } = useSettings();

    
    const exerciseType = [
        { "label": "Reps", "value": "reps" },
        { "label": "Weight/ Reps", "value": "weightAndReps" },
        { "label": "Distance/ Time", "value": "distanceAndTime" },
    ];
    
    const handleAddExercise = () => {
        const formValues = getValues();
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
            
            realm.create("Exercises", { "id": newId, "name": formValues.exerciseName, "type": selectedExerciseType, "notes": formValues.exerciseNotes, "video": videoPath, "personalBest": "N/A" });
        });
        const allExercises = realm.objects("Exercises");
        realm.close();
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Exercise Name</Text>
                <Controller
                    control = {control}
                    name = "exerciseName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {(text) => {
                            onChange(text);
                            setExerciseName(text);
                        }} value = {value} style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                    ); }}
                />
                <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Exercise Type</Text>
                <DropdownComponent
                    data = {exerciseType}
                    value = {selectedExerciseType}
                    onChange = {setselectedExerciseType}
                />
                <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Exercise Notes</Text>
                <Controller
                    control = {control}
                    name = "exerciseNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                    ); }}
                />       
                <UploadMedia onMediaSelect = {(path) => { return setVideoPath(path); }} mediaFileName = {`${exerciseName}.mp4`} mediaType = "Video" />
                <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 mt-[15px]" onPress = {handleAddExercise}>
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-3xl">Add Exercise</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreateExercise;
