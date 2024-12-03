import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useSettings } from "../settings/settings.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const WorkoutHistory = () => {
    const { theme } = useSettings();

    return (
        <ScrollView className = "mt-5">
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Workout 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Workout 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.black }}>Workout 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default WorkoutHistory;
