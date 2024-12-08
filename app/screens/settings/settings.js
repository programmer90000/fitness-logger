import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { colours } from "../../constants/colours.js";

const Settings = () => { 
    const [value, setValue] = useState(null);
    const theme = [
        { "label": "Light Mode", "value": "light" },
        { "label": "Dark Mode", "value": "dark" },
    ];
    const weight = [
        { "label": "Metric (KG)", "value": "metric" },
        { "label": "Imperial (lB)", "value": "imperial" },
    ];
    const distance = [
        { "label": "Metric (KM)", "value": "reps" },
        { "label": "Imperial (M)", "value": "weightAndReps" },
    ];
    
    const storeData = async (key, newValue) => {
        try {
            await AsyncStorage.setItem(key, newValue);
            
            const storedValue = await AsyncStorage.getItem(key);
            console.log(`Retrieved ${key}: ${storedValue}`);
        } catch (e) {
            console.log(e);
        }
    };
    
    const openHowToUseAppWebpage = () => { Linking.openURL("https://example.com"); };

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Theme</Text>
                    <DropdownComponent
                        data = {theme}
                        value = {value}
                        onChange = {(newValue) => { return storeData("theme", newValue); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Weight</Text>
                    <DropdownComponent
                        data = {weight}
                        value = {value}
                        onChange = {(newValue) => { return storeData("weight", newValue); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Distance</Text>
                    <DropdownComponent
                        data = {distance}
                        value = {value}
                        onChange = {(newValue) => { return storeData("distance", newValue); }}
                    />
                </View>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px] w-56 items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">Sync With Drive</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px] w-56 items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">Report A Bug</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px] w-56 items-center" onPress = {openHowToUseAppWebpage}>
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">How To Use The App</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Settings;
