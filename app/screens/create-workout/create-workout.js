import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { workoutPresets } from "../../../database/realm-database.js";

const CreateWorkout = () => {
    const [allWorkoutPresets, setAllWorkoutPresets] = useState([]);
    const { isReady, colours } = useTheme();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [workoutPresets] });
        const allWorkoutPresets = realm.objects("WorkoutPresets");
        setAllWorkoutPresets(allWorkoutPresets);

        return () => {
            realm.close();
        };
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <Link href = "/screens/record-workout/record-workout" asChild>
                <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 h-20 justify-center mt-[5px] w-4/6 items-center self-center mb-5">
                    <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Begin Empty Workout</Text>
                </TouchableOpacity>
            </Link>
            <Text className = "text-2xl self-center m-10 mb-5" style = {{ "color": colours.text_1 }}>Workout Presets</Text>
            {allWorkoutPresets.map((item, index) => { return (
                <TouchableOpacity key = {index} style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[5px] w-4/6 items-center self-center mb-5">
                    <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>{item.name}</Text>
                </TouchableOpacity>
            ); })}
        </ScrollView>
    );
};

export default CreateWorkout;
