import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { colours } from "../../constants/colours.js";

const useSettings = create((set) => { return {
    "theme": "light",
    "setTheme": (theme) => { return set({ theme }); },
    "weight": "metric",
    "setWeight": (weight) => { return set({ weight }); },
    "distance": "reps",
    "setDistance": (distance) => { return set({ distance }); },
};
});


const Settings = () => { 
    const { theme, setTheme } = useSettings();
    const { weight, setWeight } = useSettings();
    const { distance, setDistance } = useSettings();
    
    const themeOptions = [
        { "label": "Light Mode", "value": "light" },
        { "label": "Dark Mode", "value": "dark" },
    ];
    const weightOptions = [
        { "label": "Metric (KG)", "value": "metric" },
        { "label": "Imperial (lB)", "value": "imperial" },
    ];
    const distanceOptions = [
        { "label": "Metric (KM)", "value": "kilometers" },
        { "label": "Imperial (M)", "value": "miles" },
    ];
    
    const openHowToUseAppWebpage = () => { Linking.openURL("https://example.com"); };
    
    const pushObjectToStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Theme</Text>
                    <DropdownComponent
                        data = {themeOptions}
                        value = {theme}
                        onChange = {(newTheme) => {
                            setTheme(newTheme);
                            pushObjectToStorage("theme", newTheme);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Weight</Text>
                    <DropdownComponent
                        data = {weightOptions}
                        value = {weight}
                        onChange = {(newWeight) => {
                            setWeight(newWeight);
                            pushObjectToStorage("weight", newWeight);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Distance</Text>
                    <DropdownComponent
                        data = {distanceOptions}
                        value = {distance}
                        onChange = {(newDistance) => {
                            setDistance(newDistance);
                            pushObjectToStorage("distance", newDistance);
                        }}
                    />
                </View>
                <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 mt-[15px] w-56 items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">Sync With Drive</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 mt-[15px] w-56 items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">Report A Bug</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ "backgroundColor": colours.colour_7 }} className = "p-2 mt-[15px] w-56 items-center" onPress = {openHowToUseAppWebpage}>
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">How To Use The App</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Settings;
export { useSettings };
