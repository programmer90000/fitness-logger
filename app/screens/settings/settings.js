import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import { create } from "zustand";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const useSettings = create((set) => { return {
    "theme": "light",
    "setTheme": (theme) => { return set({ theme }); },
    "weight": "metric",
    "setWeight": (weight) => { return set({ weight }); },
};
});


const Settings = () => { 
    const [value, setValue] = useState(null);
    const { theme, setTheme } = useSettings();
    const { weight, setWeight } = useSettings();
    
    const themeOptions = [
        { "label": "Light Mode", "value": "light" },
        { "label": "Dark Mode", "value": "dark" },
    ];
    const weightOptions = [
        { "label": "Metric (KG)", "value": "metric" },
        { "label": "Imperial (lB)", "value": "imperial" },
    ];
    const distance = [
        { "label": "Metric (KM)", "value": "reps" },
        { "label": "Imperial (M)", "value": "weightAndReps" },
    ];
    
    const openHowToUseAppWebpage = () => { Linking.openURL("https://example.com"); };

    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.black }} className = "text-xl">Theme</Text>
                    <DropdownComponent
                        data = {themeOptions}
                        value = {theme}
                        onChange = {setTheme}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.black }} className = "text-xl">Weight</Text>
                    <DropdownComponent
                        data = {weightOptions}
                        value = {weight}
                        onChange = {setWeight}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.black }} className = "text-xl">Distance</Text>
                    <DropdownComponent
                        data = {distance}
                        value = {value}
                        onChange = {setValue}
                    />
                </View>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px] w-56 items-center">
                    <Text style = {{ "color": colours.black }} className = "font-bold text-xl">Sync With Drive</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px] w-56 items-center">
                    <Text style = {{ "color": colours.black }} className = "font-bold text-xl">Report A Bug</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px] w-56 items-center" onPress = {openHowToUseAppWebpage}>
                    <Text style = {{ "color": colours.black }} className = "font-bold text-xl">How To Use The App</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Settings;
