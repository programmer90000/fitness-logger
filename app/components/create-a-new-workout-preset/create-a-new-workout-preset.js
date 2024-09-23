import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { styles } from "./style.js";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const WorkoutForm = () => {
    const [removedButtons, setRemovedButtons] = useState([]);

    const { control, handleSubmit, getValues } = useForm({});
    const { fields, append, insert, remove } = useFieldArray({
        control,
        "name": "exercises",
    });
    
    const onSubmit = (data) => {
        const exercises = data.exercises.reduce((acc, exercise) => {
            const lastExercise = acc[acc.length - 1];
            if (lastExercise && lastExercise.name === exercise.name) {
                lastExercise.sets.push({ "duration": exercise.duration, "reps": exercise.reps });
            } else {
                acc.push({ "name": exercise.name, "personalBest": "N/A", "sets": [{ "duration": exercise.duration, "reps": exercise.reps }] });
            }
            return acc;
        }, []);

        const formattedData = { ...data, exercises };
        console.log(formattedData);
    };

    const updateData = () => {
        const allData = getValues();
        onSubmit(allData);
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
        <ScrollView style={{ backgroundColor: colours.white }}>
            <View style = {styles.container} className="items-center m-[5px]">
                <Text style = {{color: colours.black }} className="text-xl">Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} style = {styles.textInput} className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{color: colours.black}} className="text-xl">Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} style = {styles.textInput} multiline = {true} numberOfLines = {3} className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                /> 
                <Text style = {{color: colours.black}} className="text-xl mt-[30px]">Exercises</Text>
                <View style = {styles.formFields} className="items-center flex justify-center">
                    {fields.map((field, index) => { return (
                        <View key = {field.id} style = {styles.newExercise} className="flex-initial flex-col w-full justify-between	mt-[15px] flex-wrap items-center">
                            <View style = {styles.exerciseFormFields} className="flex-row w-full">
                                <View style = {styles.exerciseField} className="bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{color: colours.black}} className="flex-1 text-[15px]">Exercise Name</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.name`}
                                        style={styles.textInput}
                                        className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                style={styles.textInput}
                                                className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                            />
                                        ); }}
                                    />
                                </View>
                                <View style = {styles.exerciseField} className="bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{color: colours.black}} className="flex-1 text-[15px]">Personal Best</Text>
                                    <Text style = {styles.textInput} className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]">N/A</Text>
                                </View>
                                <View style = {styles.exerciseField} className="bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{color: colours.black}} className="flex-1 text-[15px]">Weight Size</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.duration`}
                                        style={styles.textInput}
                                        className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                style={styles.textInput}
                                                className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                            />
                                        ); }}
                                    />
                                </View>
                                <View style = {styles.exerciseField} className="bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{color: colours.black}} className="flex-1 text-[15px]">Reps</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.reps`}
                                        style={styles.textInput}
                                        className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                style={styles.textInput}
                                                className="align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                            />
                                        ); }}
                                    />
                                </View>
                            </View>
                            {!removedButtons.includes(index) && (
                                <TouchableOpacity onPress = {() => {
                                    updateData();
                                    addSet(index);
                                }} style = {styles.button} className="mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                                    <Text style = {{color: colours.white}} className="font-bold text-[16px]">Add Set</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                    })}
                </View>
                <TouchableOpacity onPress = {() => {
                    updateData();
                    append({ "name": "", "duration": "", "reps": "" });
                }} style = {styles.button} className="mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{color: colours.white}} className="font-bold text-[16px]">Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} style = {styles.button} className="mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style={{color: colours.white}} className="font-bold text-[16px]">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
