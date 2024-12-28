import React from "react";
import WorkoutForm from "../../components/workout-form/workout-form.js";

const RecordWorkout = () => {
    return (
        <WorkoutForm saveTo = "previousWorkouts" />
    );
};

export default RecordWorkout;
