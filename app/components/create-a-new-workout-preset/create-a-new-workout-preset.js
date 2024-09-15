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
