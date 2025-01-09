import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import Realm from "realm";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme.js";
import { workoutPresets } from "../../../database/realm-database.js";
import { useRouter } from "expo-router";

const ViewWorkoutPresets = () => {
    const router = useRouter();
    const { isReady, colours } = useTheme();
    const [workoutPresetsList, setWorkoutPresetsList] = useState([]);
    const [realmInstance, setRealmInstance] = useState(null);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [workoutPresets] });
        setRealmInstance(realm);
        const allWorkoutPresets = realm.objects("WorkoutPresets");
        setWorkoutPresetsList(allWorkoutPresets);

        const listener = () => {
            setWorkoutPresetsList([...realm.objects("WorkoutPresets")]);
        };
        realm.addListener("change", listener);

        return () => {
            realm.removeListener("change", listener);
            realm.close();
        };
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    const deleteWorkoutPreset = (presetId) => {
        if (!realmInstance) { return; }

        try {
            realmInstance.write(() => {
                const presetToDelete = realmInstance.objectForPrimaryKey("WorkoutPresets", presetId);
                if (presetToDelete) {
                    realmInstance.delete(presetToDelete);
                }
            });

            setWorkoutPresetsList((prev) => { return prev.filter((item) => { return item.id !== presetId; }); });
        } catch (error) {
            console.error("Failed to delete workout preset:", error);
        }
    };

    const confirmDelete = (presetId) => {
        Alert.alert(
            "Delete Workout Preset",
            "Are you sure you want to delete this workout preset?",
            [
                { "text": "Cancel", "style": "cancel" },
                { "text": "Delete", "style": "destructive", "onPress": () => { return deleteWorkoutPreset(presetId); } },
            ],
        );
    };
    
    const handleEditWorkoutPreset = (workoutPresetId) => {
        const workoutPreset = realmInstance.objectForPrimaryKey("WorkoutPresets", workoutPresetId);
        
        if (workoutPreset) {
            router.push({
                "pathname": "/screens/create-a-new-workout-preset/create-a-new-workout-preset",
                "params": { "id": workoutPresetId },
            });
        }
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            {workoutPresetsList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No workout presets available</Text>
            ) : (
                workoutPresetsList.map((workoutPreset) => {
                    return (
                        <TouchableOpacity key = {workoutPreset.id} className = "flex-row p-2.5 h-20 justify-between items-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }} >
                            <Text className = "text-xl text-left flex-1" style = {{ "color": colours.button_text_1 }}>{workoutPreset.name}</Text>
                            <View className = "flex-row justify-end items-center">
                                <Ionicons name = "pencil" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} onPress = {() => { return handleEditWorkoutPreset(workoutPreset.id); }} />
                                <Ionicons name = "trash" size = {24} color = {colours.button_icon_1} onPress = {() => { return confirmDelete(workoutPreset.id); }} />
                            </View>
                        </TouchableOpacity>
                    );
                })
            )}
        </ScrollView>
    );
};

export default ViewWorkoutPresets;
