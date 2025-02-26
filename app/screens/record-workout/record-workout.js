import React from "react";
import { useRoute } from "@react-navigation/native";
import WorkoutForm from "../../components/workout-form/workout-form.js";

const RecordWorkout = () => {
    const route = useRoute();
    const params = route.params || {};
    
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
