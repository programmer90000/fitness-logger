import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";

const CreateWorkout = () => {
    const workoutPresets = [
        { "name": "Workout Preset 1" },
        { "name": "Workout Preset 2" },
        { "name": "Workout Preset 3" },
        { "name": "Workout Preset 4" },
        { "name": "Workout Preset 5" },
    ];
    
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Begin Empty Workout</Text>
            </TouchableOpacity>
            <Text className = "text-2xl self-center m-10 mb-5">Workout Presets</Text>
            {workoutPresets.map((item, index) => { return (
                <TouchableOpacity key = {index} style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[5px] w-4/6 items-center self-center mb-5">
                    <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>{item.name}</Text>
                </TouchableOpacity>
            ); })}
        </ScrollView>
    );
};

export default CreateWorkout;
