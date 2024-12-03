import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useSettings } from "../settings/settings.js";
import { colours } from "../../constants/colours.js";

const ViewGoals = () => {
    const { theme } = useSettings();

    return (
        <ScrollView className = "mt-5">
            <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Goal 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Goal 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.colour_4 }}>Goal 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ViewGoals;
