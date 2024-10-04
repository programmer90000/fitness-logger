import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropdownComponent from "../dropdown-box/dropdown-box.js";
import UploadVideo from "../upload-video/upload-video.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const WorkoutForm = () => {
    const { control } = useForm({});
    
    const [value, setValue] = useState(null);
    const exerciseType = [
        { "label": "Reps", "value": "reps" },
        { "label": "Weight/ Reps", "value": "weightAndReps" },
        { "label": "Distance/ Time", "value": "distanceAndTime" },
    ];

    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.black }} className = "text-xl">Exercise Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{ "color": colours.black }} className = "text-xl">Exercise Type</Text>
                <DropdownComponent
                    data = {exerciseType}
                    value = {value}
                    onChange = {setValue}
                />
                <Text style = {{ "color": colours.black }} className = "text-xl">Exercise Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />       
                <UploadVideo />
                <TouchableOpacity className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.white }} className = "font-bold text-[16px]">Add Exercise</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
