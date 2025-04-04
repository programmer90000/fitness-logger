import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { workoutPresets, workoutPresetsExercises, exercises } from "../../../database/realm-database.js";

const CreateWorkout = () => {
    const [allWorkoutPresets, setAllWorkoutPresets] = useState([]);
    const { isReady, colours } = useTheme();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const fetchWorkoutPresets = async () => {
            const realm = new Realm({ "schema": [workoutPresets] });
            try {
                const allWorkoutPresets = realm.objects("WorkoutPresets");
                const presetsArray = allWorkoutPresets.map((item) => { return { ...item }; });
                setAllWorkoutPresets(presetsArray);
            } catch (error) {
                console.error("Error fetching workout presets:", error);
            } finally {
                realm.close();
            }
        };

        fetchWorkoutPresets();
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
            {allWorkoutPresets.map((preset, index) => {
                const realm = new Realm({ "schema": [workoutPresets, workoutPresetsExercises, exercises] });
                const presetExercises = realm.objects("WorkoutPresetsExercises").filtered("workoutPresets.id == $0", preset.id);
                const exerciseData = presetExercises.map((preset) => { return {
                    "name": preset.exercises.name,
                    "duration": preset.metrics,
                    "reps": preset.volume,
                    "personalBest": preset.exercises.personalBest,
                }; });
                realm.close();

                return (
                    <Link key = {index} href = {{ "pathname": "/screens/record-workout/record-workout", "params": { "workoutName": preset.name, "workoutNotes": preset.notes, "exercises": JSON.stringify(exerciseData) } }} asChild >
                        <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[5px] w-4/6 items-center self-center mb-5">
                            <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>{preset.name}</Text>
                        </TouchableOpacity>
                    </Link>
                ); })}

        </ScrollView>
    );
};

export default CreateWorkout;
