import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DropdownComponent from "../../components/dropdown-box/dropdown-box";
import { exercises, badges } from "../../../database/realm-database.js";
import Realm from "realm";
import UploadMedia from "../../components/upload-media/upload-media.js";
import { useSettings } from "../settings/settings.js";
import { colours } from "../../constants/colours.js";

const WorkoutForm = () => {
    const [goalName, setGoalName] = useState(null);
    const [selectedExerciseType, setSelectedExerciseType] = useState(null);
    const { control, handleSubmit, getValues, setValue } = useForm({});
    const [videoPath, setVideoPath] = useState(null);
    const [name, setName] = useState(null);
    
    const { fields, append, insert, remove } = useFieldArray({ control, "name": "exercises" });
    const { theme } = useSettings();


    const realm = new Realm({ "schema": [exercises] });
    const allExercises = realm.objects("Exercises");
    const names = allExercises.map((exercise) => {
        return {
            "label": exercise.name,
            "value": exercise.name.replace(/\s/g, ""), // Remove spaces using regex
            "type": exercise.type,
        };
    });
    realm.close();

    const onSubmit = () => {
        const formValues = getValues();
        const realm = new Realm({ "schema": [badges] });
        realm.write(() => {
            const currentHighestId = realm.objects("Badges").max("id") || 0;
            const newId = currentHighestId + 1;

            let exerciseDetails = "";
            if (selectedExerciseType === "reps") {
                exerciseDetails = `Reps: ${formValues.reps}`;
            } else if (selectedExerciseType === "weightAndReps") {
                exerciseDetails = `Weight: ${formValues.weight}, Reps: ${formValues.reps}`;
            } else if (selectedExerciseType === "distanceAndTime") {
                exerciseDetails = `Distance: ${formValues.distance}, Time: ${formValues.time}`;
            }

            realm.create("Badges", {
                "id": newId,
                "goalName": formValues.goalName,
                "exerciseName": name,
                "image": videoPath || "",
                "details": exerciseDetails,
                "completed": false,
            });
        });
        const allBadges = realm.objects("Badges");
        realm.close();
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.colour_4 }} className = "text-xl">Goal Name</Text>
                <Controller control = {control} name = "goalName" render = {({ "field": { onChange, onBlur, value } }) => {
                    return (<TextInput onBlur = {onBlur} onChangeText = {(text) => {
                        onChange(text);
                        setGoalName(text);
                    }} value = {value} style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                    ); }} />
                <DropdownComponent data = {names} value = {name} onChange = {(name) => {
                    setName(name);
                    setValue("exercises.name", name);
                    setSelectedExerciseType(names.find((item) => { return item.value === name; })?.type);                 
                }} style = {{ "width": 200 }} placeholder = "Exercise Name" />
                
                {selectedExerciseType === "reps" && (
                    <View style = {{ "backgroundColor": colours.colour_6 }} className = {"items-center flex-1 m-2.5 p-{20px} w-11/12"}>
                        <Text>Number of Reps</Text>
                        <Controller control = {control} name = {"reps"} render = {({ "field": { onChange, onBlur, value } }) => {
                            return (<TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                            ); }} />
                    </View>
                )}
                {selectedExerciseType === "weightAndReps" && (
                    <View style = {{ "backgroundColor": colours.colour_6 }} className = {"items-center flex-1 m-2.5 p-{20px} w-11/12"}>
                        <Text>Amount of Weight</Text>
                        <Controller control = {control} name = {"weight"} render = {({ "field": { onChange, onBlur, value } }) => {
                            return (<TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                            ); }} />
                        <Text>Number of Reps</Text>
                        <Controller control = {control} name = {"reps"} render = {({ "field": { onChange, onBlur, value } }) => {
                            return (<TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                            ); }} />
                    </View>
                )}
                {selectedExerciseType === "distanceAndTime" && (
                    <View style = {{ "backgroundColor": colours.colour_6 }} className = {"items-center flex-1 m-2.5 p-{20px} w-11/12"}>
                        <Text>Distance</Text>
                        <Controller control = {control} name = {"distance"} render = {({ "field": { onChange, onBlur, value } }) => {
                            return (<TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                            ); }} />
                        <Text>Time</Text>
                        <Controller control = {control} name = {"time"} render = {({ "field": { onChange, onBlur, value } }) => { return (<TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" style = {{ "backgroundColor": colours.colour_5 }} className = {"align-middle text-center w-11/12 flex-1 m-2.5"} />
                        ); }} />
                    </View>
                )}

                <UploadMedia onMediaSelect = {(path) => { return setVideoPath(path); }} mediaFileName = {`${goalName}.mp4`} mediaType = "Image" />
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} style = {{ "backgroundColor": colours.colour_13 }} className = {"mt-[100px] p-2 m-[5px]"}>
                    <Text style = {{ "color": colours.colour_2 }} className = "font-bold text-[16px]">Create Goal</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
