import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { exercises, workoutPresets, workoutPresetsExercises } from "../../../database/realm-database.js";
import Realm from "realm";
import DropdownComponent from "../../components/dropdown-box/dropdown-box";
import { useSettings } from "../../screens/settings/settings.js";
import { colours } from "../../constants/colours.js";

const WorkoutForm = () => {
    const [removedButtons, setRemovedButtons] = useState([]);
    const [workoutName, setWorkoutName] = useState(null);

    const { control, handleSubmit, getValues, setValue } = useForm({});
    const { fields, append, insert, remove } = useFieldArray({
        control,
        "name": "exercises",
    });
    const { theme } = useSettings();

    
    const realm = new Realm({ "schema": [exercises] });
    const allExercises = realm.objects("Exercises");
    const names = allExercises.map((exercise) => { return exercise.name; });
    const names2 = names.map((name) => {
        return {
            "label": name,
            "value": name.replace(/\s/g, ""), // Remove spaces using regex
        };
    }); realm.close();
    realm.close();
    
    
    const onSubmit = (data) => {
        const realm = new Realm({ "schema": [workoutPresets, exercises, workoutPresetsExercises] });

        try {
            realm.write(() => {
                const currentWorkoutId = realm.objects("WorkoutPresets").max("id") || 0;
                let newWorkoutId;
                if (currentWorkoutId === 0)
                {
                    newWorkoutId = 1;
                } else {
                    newWorkoutId = currentWorkoutId + 1;
                }

                const newWorkout = realm.create("WorkoutPresets", {
                    "id": newWorkoutId,
                    "name": data.workoutName,
                    "notes": data.workoutNotes || "",
                });

                data.exercises.forEach((exercise) => {
                    const currentWorkoutPresetsExercisesId = realm.objects("WorkoutPresetsExercises").max("id") || 0;
                    let newWorkoutPresetsExercisesId;
                    if (currentWorkoutPresetsExercisesId === 0)
                    {
                        newWorkoutPresetsExercisesId = 1;
                    } else {
                        newWorkoutPresetsExercisesId = currentWorkoutPresetsExercisesId + 1;
                    }

                    const exerciseObj = realm.objects("Exercises").filtered("name == $0", exercise.name)[0];
                    if (!exerciseObj) {
                        throw new Error(`Exercise with name "${exercise.name}" not found.`);
                    }

                    realm.create("WorkoutPresetsExercises", {
                        "id": newWorkoutPresetsExercisesId,
                        "workoutPresets": newWorkout,
                        "exercises": exerciseObj,
                        "metrics": exercise.duration,
                        "volume": exercise.reps.toString(),
                    });
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
        <ScrollView style = {{ "backgroundColor": colours.off_white }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.charcoal }} className = "text-xl">Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = {`align-middle text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}]`} />
                    ); }}
                />
                <Text style = {{ "color": colours.charcoal }} className = "text-xl">Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = {`align-middle text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}]`} />
                    ); }}
                /> 
                <Text style = {{ "color": colours.charcoal }} className = "text-xl mt-[30px]">Exercises</Text>
                <View className = "items-center flex justify-center">
                    {fields.map((field, index) => { return (
                        <View key = {field.id} className = "flex-initial flex-col w-full justify-between mt-[15px] flex-wrap items-center">
                            <View className = "flex-row w-full">
                                <View className = {`bg-[${colours.very_light_grey}] items-center min-h-[100px] flex-1 m-2.5 p-{20px}`}>
                                    <Text style = {{ "color": colours.charcoal }} className = "flex-1 text-[15px] h-5">Exercise Name</Text>
                                    <DropdownComponent data = {names2} value = {field.name} onChange = {(name) => { setValue(`exercises.${index}.name`, name); }} style = {{ "width": 100 }} placeholder = "Exercise Name" />
                                </View>
                                <View className = {`bg-[${colours.very_light_grey}] items-center min-h-[100px] flex-1 m-2.5 p-{20px}`}>
                                    <Text style = {{ "color": colours.charcoal }} className = "flex-1 text-[15px] h-5">Personal Best</Text>
                                    <Text className = {`text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}] h-[27px] leading-[35px]`}>N/A</Text>
                                </View>
                                <View className = {`bg-[${colours.very_light_grey}] items-center min-h-[100px] flex-1 m-2.5 p-{20px}`}>
                                    <Text style = {{ "color": colours.charcoal }} className = "flex-1 text-[15px] h-5">Weight Size</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.duration`}
                                        className = {`align-middle text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}] h-5`}
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                className = {`align-middle text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}]`}
                                            />
                                        ); }}
                                    />
                                </View>
                                <View className = {`bg-[${colours.very_light_grey}] items-center min-h-[100px] flex-1 m-2.5 p-{20px}`}>
                                    <Text style = {{ "color": colours.charcoal }} className = "flex-1 text-[15px] h-5">Reps</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.reps`}
                                        className = {`align-middle text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}] h-5`}
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                className = {`align-middle text-center w-11/12 flex-1 m-2.5 bg-[${colours.light_grey}]`}
                                            />
                                        ); }}
                                    />
                                </View>
                            </View>
                            {!removedButtons.includes(index) && (
                                <TouchableOpacity onPress = {() => {
                                    updateData();
                                    addSet(index);
                                }} className = {`mt-[100px] bg-[${colours.light_blue}] p-2 m-[5px]`}>
                                    <Text style = {{ "color": colours.off_white }} className = "font-bold text-[16px]">Add Set</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                    })}
                </View>
                <TouchableOpacity onPress = {() => {
                    updateData();
                    append({ "name": "", "duration": "", "reps": "" });
                }} className = {`mt-[100px] bg-[${colours.light_blue}] p-2 m-[5px]`}>
                    <Text style = {{ "color": colours.off_white }} className = "font-bold text-[16px]">Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} className = {`mt-[100px] bg-[${colours.light_blue}] p-2 m-[5px]`}>
                    <Text style = {{ "color": colours.off_white }} className = "font-bold text-[16px]">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
