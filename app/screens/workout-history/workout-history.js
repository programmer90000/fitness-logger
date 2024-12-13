import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme.js";

const WorkoutHistory = () => {
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }
    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Workout 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Workout 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Workout 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default WorkoutHistory;
