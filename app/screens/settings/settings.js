import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import * as Linking from "expo-linking";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { useTheme } from "../../hooks/useTheme.js";
import { getSettings, updateSetting, subscribeToSettings } from "../../utils/settings-store.js";
import { storeData, retrieveData } from "../../utils/async-storage.js";
import { colours } from "../../constants/colours.js";
import { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges } from "../../../database/realm-database.js";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const Settings = () => { 
    const [themeValue, setThemeValue] = useState(null);
    const [weightValue, setWeightValue] = useState(null);
    const [distanceValue, setDistanceValue] = useState(null);
    const [settings, setSettings] = useState(getSettings());
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

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
    
    const shareJSONData = async () => {
        try {
            const realm = await Realm.open({ "schema": [workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges] });

            const workoutPresetsRecords = realm.objects("WorkoutPresets");
            const exercisesRecords = realm.objects("Exercises");
            const workoutPresetsExercisesRecords = realm.objects("WorkoutPresetsExercises");
            const previousWorkoutsRecords = realm.objects("PreviousWorkouts");
            const previousWorkoutsExercisesRecords = realm.objects("PreviousWorkoutsExercises");
            const goalsRecords = realm.objects("Goals");
            const badgesRecords = realm.objects("Badges");

            const data = { "workoutPresets": workoutPresetsRecords, "exercises": exercisesRecords, "workoutPresetsExercises": workoutPresetsExercisesRecords, "previousWorkouts": previousWorkoutsRecords, "previousWorkoutsExercises": previousWorkoutsExercisesRecords, "goals": goalsRecords, "badges": badgesRecords };

            const fileContents = JSON.stringify(data, null, 2);
            realm.close();
            const fileUri = `${FileSystem.cacheDirectory}fitness-logger-data.json`;
            await FileSystem.writeAsStringAsync(fileUri, fileContents, {
                "encoding": FileSystem.EncodingType.UTF8,
            });
            
            if (!(await Sharing.isAvailableAsync())) {
                Alert.alert("Error", "Sharing is not available on this device.");
                return;
            }

            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error("Error creating JSON data:", error);
            throw error;
        }
    };



    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Theme</Text>
                    <DropdownComponent
                        data = {theme}
                        value = {themeValue}
                        placeholderStyle = {{ "color": colours.button_text_1 }}
                        selectedTextStyle = {{ "color": colours.button_text_1 }}
                        onChange = {(newValue) => {
                            updateSetting("theme", newValue);
                            setThemeValue(newValue);
                            storeData("theme", newValue);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Weight</Text>
                    <DropdownComponent
                        data = {weight}
                        value = {weightValue}
                        placeholderStyle = {{ "color": colours.button_text_1 }}
                        selectedTextStyle = {{ "color": colours.button_text_1 }}
                        onChange = {(newValue) => {
                            updateSetting("weight", newValue);
                            setWeightValue(newValue);
                            storeData("weight", newValue);
                        }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Distance</Text>
                    <DropdownComponent
                        data = {distance}
                        value = {distanceValue}
                        placeholderStyle = {{ "color": colours.button_text_1 }}
                        selectedTextStyle = {{ "color": colours.button_text_1 }}
                        onChange = {(newValue) => {
                            updateSetting("distance", newValue);
                            setDistanceValue(newValue);
                            storeData("distance", newValue);
                        }}
                    />
                </View>
                <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px] w-56 items-center" onPress = {shareJSONData}>
                    <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-xl">Share Data</Text>
                </TouchableOpacity>
                <Link href = "/screens/report-feedback/report-feedback" asChild>
                    <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px] w-56 items-center">
                        <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-xl">Report Feedback</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px] w-56 items-center" onPress = {openHowToUseAppWebpage}>
                    <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-xl">How To Use The App</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Settings;
