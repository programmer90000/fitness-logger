import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { workoutPresets } from "../../../database/realm-database.js";

const ViewWorkoutPresets = () => {
    const { isReady, colours } = useTheme();
    const [workoutPresetsList, setWorkoutPresetsList] = useState([]);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [workoutPresets] });
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

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            {workoutPresetsList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No workout presets available</Text>
            ) : (
                workoutPresetsList.map((workoutPreset) => { return (
                    <TouchableOpacity key = {workoutPreset.id} className = "p-2.5 h-20 justify-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }}>
                        <Text className = "text-xl text-center" style = {{ "color": colours.button_text_1 }}>{workoutPreset.name}</Text>
                    </TouchableOpacity>
                ); })
            )}
        </ScrollView>
    );
};

export default ViewWorkoutPresets;
