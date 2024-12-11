import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme.js";

const WorkoutHistory = () => {
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }
    return (
        <ScrollView className = "mt-5">
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Workout 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Workout 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Workout 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default WorkoutHistory;
