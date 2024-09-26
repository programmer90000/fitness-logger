import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";

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
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.black }} className = "text-xl">Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{ "color": colours.black }} className = "text-xl">Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                /> 
                <Text style = {{ "color": colours.black }} className = "text-xl mt-[30px]">Exercises</Text>
                <View className = "items-center flex justify-center">
                    {fields.map((field, index) => { return (
                        <View key = {field.id} className = "flex-initial flex-col w-full justify-between mt-[15px] flex-wrap items-center">
                            <View className = "flex-row w-full">
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.black }} className = "flex-1 text-[15px] h-5">Exercise Name</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.name`}
                                        className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE] h-5"
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                            />
                                        ); }}
                                    />
                                </View>
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.black }} className = "flex-1 text-[15px] h-5">Personal Best</Text>
                                    <Text className = "text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE] h-[27px] leading-[35px]">N/A</Text>
                                </View>
                                <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                    <Text style = {{ "color": colours.black }} className = "flex-1 text-[15px] h-5">Weight Size</Text>
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
                                    <Text style = {{ "color": colours.black }} className = "flex-1 text-[15px] h-5">Reps</Text>
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
                                    <Text style = {{ "color": colours.white }} className = "font-bold text-[16px]">Add Set</Text>
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
                    <Text style = {{ "color": colours.white }} className = "font-bold text-[16px]">Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.white }} className = "font-bold text-[16px]">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;

import React from "react";
import { View, ScrollView, Text, TextInput, Button } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const WorkoutForm = () => {
    const { control, handleSubmit } = useForm({});
    const { fields, append } = useFieldArray({
        control,
        "name": "exercises",
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const addExercise = () => {
        append({ "name": "", "duration": "", "reps": "" });
    };

    return (
        <ScrollView>
            <View>
                <Text>Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value = {value}
                        />
                    ); }}
                />

                <Text>Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value = {value}
                        />
                    ); }}
                />

                <Text>Exercises</Text>

                {fields.map((field, index) => { return (
                    <View key = {field.id}>
                        <Text>Exercise Name</Text>
                        <Controller
                            control = {control}
                            name = {`exercises.${index}.name`}
                            render = {({ "field": { onChange, onBlur, value } }) => { return (
                                <TextInput
                                    onBlur = {onBlur}
                                    onChangeText = {onChange}
                                    value = {value}
                                />
                            ); }}
                        />
                        <Text>Weight Size</Text>
                        <Controller
                            control = {control}
                            name = {`exercises.${index}.duration`}
                            render = {({ "field": { onChange, onBlur, value } }) => { return (
                                <TextInput
                                    onBlur = {onBlur}
                                    onChangeText = {onChange}
                                    value = {value}
                                    keyboardType = "numeric"
                                />
                            ); }}
                        />
                        <Text>Reps</Text>
                        <Controller
                            control = {control}
                            name = {`exercises.${index}.reps`}
                            render = {({ "field": { onChange, onBlur, value } }) => { return (
                                <TextInput
                                    onBlur = {onBlur}
                                    onChangeText = {onChange}
                                    value = {value}
                                    keyboardType = "numeric"
                                />
                            ); }}
                        />
                    </View>
                ); })}
                <Button title = "Add Exercise" onPress = {addExercise} />
                <Button title = "Submit" onPress = {handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
