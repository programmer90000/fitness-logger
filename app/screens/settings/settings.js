import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { colours } from "../../constants/colours.js";
import { getSettings, updateSetting, subscribeToSettings } from "../../utils/settings-store.js";
import { storeData, retrieveData } from "../../utils/async-storage.js";

const Settings = () => { 
    const [themeValue, setThemeValue] = useState(null);
    const [weightValue, setWeightValue] = useState(null);
    const [distanceValue, setDistanceValue] = useState(null);
    const [settings, setSettings] = useState(getSettings());

    const loadResources = async () => {
        try {
            const theme = await retrieveData("theme");
            const weight = await retrieveData("weight");
            const distance = await retrieveData("distance");
            
            if (theme) { setThemeValue(theme); }
            if (weight) { setWeightValue(weight); }
            if (distance) { setDistanceValue(distance); }
        } catch (error) {
            console.error("Error loading AsyncStorage data:", error);
        }
    };
    
    useEffect(() => {
        const unsubscribe = subscribeToSettings(setSettings);
        return () => { return unsubscribe(); };
    }, []);

    useEffect(() => {
        loadResources();
        if (settings) {
            setThemeValue(settings.theme);
            setWeightValue(settings.weight);
            setDistanceValue(settings.distance);
        }
    }, [settings]);

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
                        value = {themeValue}
                        onChange = {(newValue) => {
                            updateSetting("theme", newValue);
                            setThemeValue(newValue);
                            storeData("theme", newValue);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Weight</Text>
                    <DropdownComponent
                        data = {weight}
                        value = {weightValue}
                        onChange = {(newValue) => {
                            updateSetting("weight", newValue);
                            setWeightValue(newValue);
                            storeData("weight", newValue);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Distance</Text>
                    <DropdownComponent
                        data = {distance}
                        value = {distanceValue}
                        onChange = {(newValue) => {
                            updateSetting("distance", newValue);
                            setDistanceValue(newValue);
                            storeData("distance", newValue);
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
