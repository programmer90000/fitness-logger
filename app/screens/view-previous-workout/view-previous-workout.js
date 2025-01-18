import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { previousWorkouts, exercises, previousWorkoutsExercises } from "../../../database/realm-database.js";
import { useLocalSearchParams } from "expo-router";

const ViewPreviousWorkoutDetails = () => {
    const [previousWorkout, setPreviousWorkout] = useState(null);
    const [realmInstance, setRealmInstance] = useState(null);
    const { isReady, colours } = useTheme();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [previousWorkouts, exercises, previousWorkoutsExercises] });
        setRealmInstance(realm);

        const workoutPresetDetails = realm.objectForPrimaryKey("PreviousWorkouts", parseInt(id));
        setPreviousWorkout(workoutPresetDetails);

        return () => {
            realm.close();
        };
    }, [isReady, id]);

    if (!previousWorkout) {
        return <Text>Loading...</Text>;
    }

    const previousWorkoutExercisesList = realmInstance.objects("PreviousWorkoutsExercises").filtered(`previousWorkouts.id = ${previousWorkout.id}`);

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Name</Text>
                <Text className = "text-center text-xl">{previousWorkout.name}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Notes:</Text>
                <Text className = "text-center text-xl">{previousWorkout.notes}</Text>

                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Exercises:</Text>
                {previousWorkoutExercisesList.length > 0 ? (
                    previousWorkoutExercisesList.map((workoutPresetsExercise) => {
                        const exercise = workoutPresetsExercise.exercises;
                        return (
                            <View key = {exercise.id}>
                                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-xl mt-2 text-center">{exercise.name}</Text>
                                <Text className = "text-center">Duration: {workoutPresetsExercise.metrics}</Text>
                                <Text className = "text-center">Reps: {workoutPresetsExercise.volume}</Text>
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

export default ViewPreviousWorkoutDetails;
