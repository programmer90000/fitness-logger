import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const WorkoutForm = () => {
    const { control } = useForm({});
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [endDate, setEndDate] = useState(new Date(1598051730000));
    const [endShow, setEndShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };
    const options = {
        "year": "numeric",
        "month": "numeric",
        "day": "numeric",
    };
    
    const onEndChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndShow(false);
        setEndDate(currentDate);
    };
    const showEndDatepicker = () => {
        setEndShow(true);
    };



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
                <View className = "flex-row items-center">
                    <Text className = "mr-4">Start Date</Text>
                    <TouchableOpacity control = {control} name = "startDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]" onPress = {showDatepicker}><Text style = {{ "color": colours.black }} className = "font-bold text-[16px]">{date.toLocaleString("en-GB", options)}</Text></TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID = "dateTimePicker"
                            value = {date}
                            mode = {mode}
                            is24Hour = {true}
                            onChange = {onChange}
                        />
                    )}
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4">End Date</Text>
                    <TouchableOpacity control = {control} name = "endDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]" onPress = {showEndDatepicker}>
                        <Text style = {{ "color": colours.black }} className = "font-bold text-[16px]">
                            {endDate.toLocaleString("en-GB", options)}
                        </Text>
                    </TouchableOpacity>
                    {endShow && (
                        <DateTimePicker
                            testID = "endDateTimePicker"
                            value = {endDate}
                            mode = {mode}
                            is24Hour = {true}
                            onChange = {onEndChange}
                        />
                    )}
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4">Additional Notes</Text>
                    <Controller control = {control} name = "goal" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} numberOfLines = {5} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
