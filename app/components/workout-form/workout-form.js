import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { exercises, workoutPresets, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises } from "../../../database/realm-database.js";
import Realm from "realm";
import DropdownComponent from "../../components/dropdown-box/dropdown-box";
import { useTheme } from "../../hooks/useTheme.js";

const WorkoutForm = ({ saveTo }) => {
    const [removedButtons, setRemovedButtons] = useState([]);
    const [workoutName, setWorkoutName] = useState(null);

    const { control, handleSubmit, getValues, setValue } = useForm({});
    const { fields, append, insert, remove } = useFieldArray({
        control,
        "name": "exercises",
    });
    
    const realm = new Realm({ "schema": [exercises] });
    const allExercises = realm.objects("Exercises");
    const names = allExercises.map((exercise) => { return exercise.name; });
    const names2 = names.map((name) => {
        return {
            "label": name,
            "value": name,
        };
    });
    realm.close();
    
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }
    
    
    const onSubmit = (data) => {
        const realm = new Realm({ "schema": [workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises] });

        try {
            realm.write(() => {
                let newId, newWorkout;

                if (saveTo === "workoutPresets") {
                    const currentWorkoutId = realm.objects("WorkoutPresets").max("id") || 0;
                    newId = currentWorkoutId === 0 ? 1 : currentWorkoutId + 1;

                    newWorkout = realm.create("WorkoutPresets", {
                        "id": newId,
                        "name": data.workoutName,
                        "notes": data.workoutNotes || "",
                    });
                } else if (saveTo === "previousWorkouts") {
                    const currentPreviousWorkoutId = realm.objects("PreviousWorkouts").max("id") || 0;
                    newId = currentPreviousWorkoutId === 0 ? 1 : currentPreviousWorkoutId + 1;

                    newWorkout = realm.create("PreviousWorkouts", {
                        "id": newId,
                        "name": data.workoutName,
                        "notes": data.workoutNotes || "",
                        "date": new Date(),
                    });
                }

                data.exercises.forEach((exercise) => {
                    const currentWorkoutExercisesId = realm.objects("WorkoutPresetsExercises").max("id") || 0;
                    const newWorkoutExercisesId = currentWorkoutExercisesId === 0 ? 1 : currentWorkoutExercisesId + 1;

                    const exerciseObj = realm.objects("Exercises").filtered("name == $0", exercise.name)[0];
                    if (!exerciseObj) {
                        throw new Error(`Exercise with name "${exercise.name}" not found.`);
                    }

                    if (saveTo === "workoutPresets") {
                        realm.create("WorkoutPresetsExercises", {
                            "id": newWorkoutExercisesId,
                            "workoutPresets": newWorkout,
                            "exercises": exerciseObj,
                            "metrics": exercise.duration,
                            "volume": exercise.reps.toString(),
                        });
                    } else if (saveTo === "previousWorkouts") {
                        realm.create("PreviousWorkoutsExercises", {
                            "id": newWorkoutExercisesId,
                            "previousWorkouts": newWorkout,
                            "exercises": exerciseObj,
                            "metrics": exercise.duration,
                            "volume": exercise.reps.toString(),
                        });
                    }
                });
            });
        } catch (error) {
            console.error("Error saving workout:", error);
        } finally {
            realm.close();
        }
    };

    const updateData = () => {
        const allData = getValues();
    };

    const addSet = (index) => {
        const currentValues = getValues(`exercises.${index}`);
        insert(index + 1, {
            "name": currentValues.name,
            "personalBest": currentValues.personalBest || "N/A",
            "duration": currentValues.duration,
            "reps": currentValues.reps,
        });
        setRemovedButtons([...removedButtons, index]);
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                /> 
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl mt-[30px]">Exercises</Text>
                <View className = "items-center flex justify-center">
                    {fields.map((field, index) => { return (
                        <View key = {field.id} className = "flex-initial flex-col w-full justify-between mt-[15px] flex-wrap items-center">
                            <View className = "flex-row w-full">
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Exercise Name</Text>
                                    <DropdownComponent data = {names2} value = {field.name} onChange = {(name) => { setValue(`exercises.${index}.name`, name); }} style = {{ "width": 100 }} placeholder = "Exercise Name" />
                                </View>
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Personal Best</Text>
                                    <Text className = "text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE] h-[27px] leading-[35px]">N/A</Text>
                                </View>
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Weight Size</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.duration`}
                                        className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE] h-5"
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                            />
                                        ); }}
                                    />
                                </View>
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Reps</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.reps`}
                                        className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE] h-5"
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                            />
                                        ); }}
                                    />
                                </View>
                            </View>
                            {!removedButtons.includes(index) && (
                                <TouchableOpacity onPress = {() => {
                                    updateData();
                                    addSet(index);
                                }} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Add Set</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                    })}
                </View>
                <TouchableOpacity onPress = {() => {
                    updateData();
                    append({ "name": "", "duration": "", "reps": "" });
                }} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
