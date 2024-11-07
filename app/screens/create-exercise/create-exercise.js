import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import UploadVideo from "../../components/upload-video/upload-video.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const CreateExercise = () => {
    const { control, getValues } = useForm({});
    const [exerciseName, setExerciseName] = useState("");
    
    const [selectedExerciseType, setselectedExerciseType] = useState(null);
    const exerciseType = [
        { "label": "Reps", "value": "reps" },
        { "label": "Weight/ Reps", "value": "weightAndReps" },
        { "label": "Distance/ Time", "value": "distanceAndTime" },
    ];
    
    const handleAddExercise = () => {
        const formValues = getValues();
        console.log(formValues.exerciseName);
        console.log(selectedExerciseType);
        console.log(formValues.exerciseNotes);
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.black }} className = "text-xl">Exercise Name</Text>
                <Controller
                    control = {control}
                    name = "exerciseName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {(text) => {
                            onChange(text); 
                            setExerciseName(text);
                        }} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{ "color": colours.black }} className = "text-xl">Exercise Type</Text>
                <DropdownComponent
                    data = {exerciseType}
                    value = {selectedExerciseType}
                    onChange = {setselectedExerciseType}
                />
                <Text style = {{ "color": colours.black }} className = "text-xl">Exercise Notes</Text>
                <Controller
                    control = {control}
                    name = "exerciseNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />       
                <UploadVideo onVideoSelect = {handleAddExercise} videoFileName = {`${exerciseName}.mp4`} />
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px]" onPress = {handleAddExercise}>
                    <Text style = {{ "color": colours.black }} className = "font-bold text-3xl">Add Exercise</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreateExercise;
