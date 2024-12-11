import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { colours } from "../../constants/colours.js";
import { getSettings, updateSetting, subscribeToSettings } from "../../utils/settings-store.js";
import { storeData } from "../../utils/async-storage.js";

const Settings = () => { 
    const [value, setValue] = useState(null);
    const [settings, setSettings] = useState(getSettings());
    
    useEffect(() => {
        const unsubscribe = subscribeToSettings(setSettings);
        return () => { return unsubscribe(); };
    }, []);
    
    const theme = [
        { "label": "Light Mode", "value": "light" },
        { "label": "Dark Mode", "value": "dark" },
    ];
    const weight = [
        { "label": "Metric (KG)", "value": "metric" },
        { "label": "Imperial (lB)", "value": "imperial" },
    ];
    const distance = [
        { "label": "Metric (KM)", "value": "metric" },
        { "label": "Imperial (M)", "value": "imperial" },
    ];
    
    const openHowToUseAppWebpage = () => { Linking.openURL("https://example.com"); };

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Theme</Text>
                    <DropdownComponent
                        data = {theme}
                        value = {value}
                        onChange = {(newValue) => {
                            updateSetting("theme", newValue);
                            return storeData("theme", newValue);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Weight</Text>
                    <DropdownComponent
                        data = {weight}
                        value = {value}
                        onChange = {(newValue) => {
                            updateSetting("weight", newValue);
                            return storeData("weight", newValue);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Distance</Text>
                    <DropdownComponent
                        data = {distance}
                        value = {value}
                        onChange = {(newValue) => {
                            updateSetting("distance", newValue);
                            return storeData("distance", newValue);
                        }}
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
