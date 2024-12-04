import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useSettings } from "../settings/settings.js";
import { colours } from "../../constants/colours.js";

const WorkoutHistory = () => {
    const { theme } = useSettings();

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
            <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Workout 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Workout 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Workout 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default WorkoutHistory;
