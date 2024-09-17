import React from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { styles } from "./style.js";

const WorkoutForm = () => {
    const { control, handleSubmit, getValues } = useForm({});
    const { fields, append, insert } = useFieldArray({
        control,
        "name": "exercises",
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const addExercise = (index) => {
        const currentValues = getValues(`exercises.${index}`);
        insert(index + 1, {
            "name": currentValues.name,
            "personalBest": currentValues.personalBest || "N/A",
            "duration": currentValues.duration,
            "reps": currentValues.reps,
        });
    };

    return (
        <ScrollView style = {styles.screen}>
            <View style = {styles.container}>
                <Text style = {styles.title}>Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} style = {styles.textInput} />
                    ); }}
                />
                <Text style = {styles.title}>Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} style = {styles.textInput} multiline = {true} numberOfLines = {3} />
                    ); }}
                /> 
                <Text style = {[styles.title, styles.mainExerciseTitle]}>Exercises</Text>
                <View style = {styles.formFields}>
                    {fields.map((field, index) => { return (
                        <View key = {field.id} style = {styles.newExercise}>
                            <View style = {styles.exerciseFormFields}>
                                <View style = {styles.exerciseField}>
                                    <Text style = {styles.exerciseTitle}>Exercise Name</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.name`}
                                        style = {styles.textInput}
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                style = {styles.textInput}
                                            />
                                        ); }}
                                    />
                                </View>
                                <View style = {styles.exerciseField}>
                                    <Text style = {styles.exerciseTitle}>Personal Best</Text>
                                    <Text style = {styles.textInput}>N/A</Text>
                                </View>
                                <View style = {styles.exerciseField}>
                                    <Text style = {styles.exerciseTitle}>Weight Size</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.duration`}
                                        style = {styles.textInput}
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                style = {styles.textInput}
                                            />
                                        ); }}
                                    />
                                </View>
                                <View style = {styles.exerciseField}>
                                    <Text style = {styles.exerciseTitle}>Reps</Text>
                                    <Controller
                                        control = {control}
                                        name = {`exercises.${index}.reps`}
                                        style = {styles.textInput}
                                        render = {({ "field": { onChange, onBlur, value } }) => { return (
                                            <TextInput
                                                onBlur = {onBlur}
                                                onChangeText = {onChange}
                                                value = {value}
                                                keyboardType = "numeric"
                                                style = {styles.textInput}
                                            />
                                        ); }}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress = {() => { return addExercise(index); }} style = {styles.button}>
                                <Text style = {styles.buttonText}>Add Set</Text>
                            </TouchableOpacity>
                        </View>
                    );
                    })}
                </View>
                <TouchableOpacity onPress = {() => { return append({ "name": "", "duration": "", "reps": "" }); }} style = {styles.button}>
                    <Text style = {styles.buttonText}>Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} style = {styles.button}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
