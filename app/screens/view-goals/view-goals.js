import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/useTheme.js";

const ViewGoals = () => {
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }
    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_1 }}>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Goal 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Goal 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Goal 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ViewGoals;
