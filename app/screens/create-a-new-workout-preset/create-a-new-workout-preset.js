import React from "react";
import WorkoutForm from "../../components/workout-form/workout-form.js";

const CreateANewWorkoutPreset = () => {
    return (
        <WorkoutForm saveTo = "workoutPresets" />
    );
};

export default CreateANewWorkoutPreset;
