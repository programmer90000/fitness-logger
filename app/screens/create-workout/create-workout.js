import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const CreateWorkout = () => {
    const workoutPresets = [
        { "name": "Workout Preset 1" },
        { "name": "Workout Preset 2" },
        { "name": "Workout Preset 3" },
        { "name": "Workout Preset 4" },
        { "name": "Workout Preset 5" },
    ];

    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Begin Empty Workout</Text>
            </TouchableOpacity>
            <Text className = "text-2xl self-center m-10 mb-5">Workout Presets</Text>
            {workoutPresets.map((item, index) => { return (
                <TouchableOpacity key = {index} style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[5px] w-4/6 items-center self-center mb-5">
                    <Text className = "font-medium text-base" style = {{ "color": colours.black }}>{item.name}</Text>
                </TouchableOpacity>
            ); })}
        </ScrollView>
    );
};

export default CreateWorkout;
