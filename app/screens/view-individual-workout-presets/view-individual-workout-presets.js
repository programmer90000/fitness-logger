import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { workoutPresets, exercises, workoutPresetsExercises } from "../../../database/realm-database.js";
import { useRoute } from "@react-navigation/native";

const ViewWorkoutPresetDetails = () => {
    const [workoutPreset, setWorkoutPreset] = useState(null);
    const [realmInstance, setRealmInstance] = useState(null);
    const { isReady, colours } = useTheme();
    
    const route = useRoute();
    const { id } = route.params || {};

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

    const getAllWorkedMuscles = () => {
        const workedMuscles = new Set();
        const allMuscles = new Set(["Pectorals", "Upper back", "Lower back", "Deltoids", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Obliques", "Cardio"]);

        workoutPresetsExercisesList.forEach((workoutExercise) => {
            const exercise = workoutExercise.exercises;
            exercise.primaryMuscles.forEach((muscle) => { return workedMuscles.add(muscle); });
            exercise.secondaryMuscles.forEach((muscle) => { return workedMuscles.add(muscle); });
        });

        const unworkedMuscles = [...allMuscles].filter((muscle) => { return !workedMuscles.has(muscle); });

        return {
            "worked": [...workedMuscles],
            "unworked": unworkedMuscles,
        };
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Name</Text>
                <Text className = "text-center text-xl">{workoutPreset.name}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Notes:</Text>
                <Text className = "text-center text-xl">{workoutPreset.notes}</Text>

                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Exercises:</Text>
                {workoutPresetsExercisesList.length > 0 ? (
                    workoutPresetsExercisesList.map((workoutPresetsExercise, index) => {
                        const exercise = workoutPresetsExercise.exercises;
                        return (
                            <View key = {index}>
                                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-xl mt-2 text-center">{exercise.name}</Text>
                                <Text className = "text-center">Duration: {workoutPresetsExercise.metrics}</Text>
                                <Text className = "text-center">Reps: {workoutPresetsExercise.volume}</Text>
                                <View className = "mt-10">
                                    <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Muscles Worked:</Text>
                                    <Text className = "text-center text-xl">{getAllWorkedMuscles().worked.join(", ")}</Text>
                                    <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Muscles Not Worked:</Text>
                                    <Text className = "text-center text-xl">{getAllWorkedMuscles().unworked.join(", ")}</Text>
                                </View>
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
