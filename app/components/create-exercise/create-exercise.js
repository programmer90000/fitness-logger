import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropdownComponent from "../dropdown-box/dropdown-box.js";
import UploadMedia from "../upload-media/upload-media.js";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";

const WorkoutForm = () => {
    const { control } = useForm({});
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }
    
    const [value, setValue] = useState(null);
    const exerciseType = [
        { "label": "Reps", "value": "reps" },
        { "label": "Weight/ Reps", "value": "weightAndReps" },
        { "label": "Distance/ Time", "value": "distanceAndTime" },
    ];

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Exercise Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Exercise Type</Text>
                <DropdownComponent
                    data = {exerciseType}
                    value = {value}
                    onChange = {setValue}
                />
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Exercise Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />       
                <UploadMedia />
                <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px]">
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-3xl">Add Exercise</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
