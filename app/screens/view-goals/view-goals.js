import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useSettings } from "../settings/settings.js";
import { colours } from "../../constants/colours.js";

const ViewGoals = () => {
    const { theme } = useSettings();

    return (
        <ScrollView className = "mt-5">
            <TouchableOpacity style = {{ "backgroundColor": colours.red }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.charcoal }}>Goal 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.red }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.charcoal }}>Goal 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{ "backgroundColor": colours.red }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                <Text className = "font-medium text-base" style = {{ "color": colours.charcoal }}>Goal 3</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ViewGoals;
