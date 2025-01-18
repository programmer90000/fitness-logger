import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { workoutPresets, exercises, workoutPresetsExercises } from "../../../database/realm-database.js";
import { useLocalSearchParams } from "expo-router";

const ViewWorkoutPresetDetails = () => {
    const [workoutPreset, setWorkoutPreset] = useState(null);
    const [realmInstance, setRealmInstance] = useState(null);
    const { isReady, colours } = useTheme();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [workoutPresets, exercises, workoutPresetsExercises] });
        setRealmInstance(realm);

        const workoutPresetDetails = realm.objectForPrimaryKey("WorkoutPresets", parseInt(id));
        setWorkoutPreset(workoutPresetDetails);

        return () => {
            realm.close();
        };
    }, [isReady, id]);

    if (!workoutPreset) {
        return <Text>Loading...</Text>;
    }

    const workoutPresetsExercisesList = realmInstance.objects("WorkoutPresetsExercises").filtered(`workoutPresets.id = ${workoutPreset.id}`);

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View>
                <Text>{workoutPreset.name}</Text>
                <Text>Notes:</Text>
                <Text>{workoutPreset.notes}</Text>

                <Text>Exercises:</Text>
                {workoutPresetsExercisesList.length > 0 ? (
                    workoutPresetsExercisesList.map((workoutPresetsExercise) => {
                        const exercise = workoutPresetsExercise.exercises;
                        return (
                            <View key = {exercise.id}>
                                <Text>{exercise.name}</Text>
                                <Text>Duration: {workoutPresetsExercise.metrics}</Text>
                                <Text>Reps: {workoutPresetsExercise.volume}</Text>
                            </View>
                        );
                    })
                ) : (
                    <Text>No exercises available</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default ViewWorkoutPresetDetails;
