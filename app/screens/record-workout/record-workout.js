import React from "react";
import { useLocalSearchParams } from "expo-router";
import WorkoutForm from "../../components/workout-form/workout-form.js";

const RecordWorkout = () => {
    const params = useLocalSearchParams();
    
    const defaultValues = params.workoutName ? {
        "workoutName": params.workoutName,
        "workoutNotes": params.workoutNotes,
        "exercises": JSON.parse(params.exercises),
    } : {
        "workoutName": "",
        "workoutNotes": "",
        "exercises": [],
    };
    
    return (
        <WorkoutForm saveTo = "previousWorkouts" defaultValues = {defaultValues} />
    );
};

export default RecordWorkout;
