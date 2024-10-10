import React from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const WorkoutForm = () => {
    const { control } = useForm({});

    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text className = "mr-4">Name</Text>
                    <Controller control = {control} name = "goalName" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4">Goal</Text>
                    <Controller control = {control} name = "goal" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>                
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
