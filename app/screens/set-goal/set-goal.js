import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const SetGoal = () => {
    const { control } = useForm({});
    const [mode, setMode] = useState("date");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reminderDate, setReminderDate] = useState(new Date());
    const [startPickerShow, setStartPickerShow] = useState(false);
    const [endPickerShow, setEndPickerShow] = useState(false);
    const [reminderPickerShow, setReminderPickerShow] = useState(false);

    const options = {
        "year": "numeric",
        "month": "numeric",
        "day": "numeric",
    };

    const onStartChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartPickerShow(false);
        setStartDate(currentDate);
    };
    
    const onEndChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndPickerShow(false);
        setEndDate(currentDate);
    };
    
    const onReminderChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setReminderPickerShow(false);
        setReminderDate(currentDate);
    };

    const showStartDatepicker = () => {
        setStartPickerShow(true);
    };
    
    const showEndDatepicker = () => {
        setEndPickerShow(true);
    };
    
    const showReminderDatepicker = () => {
        setReminderPickerShow(true);
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.white }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">Name</Text>
                    <Controller control = {control} name = "goalName" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">Goal</Text>
                    <Controller control = {control} name = "goal" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">Start Date</Text>
                    <TouchableOpacity control = {control} name = "startDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]" onPress = {showStartDatepicker}><Text style = {{ "color": colours.black }} className = "font-bold text-[16px]">{startDate.toLocaleString("en-GB", options)}</Text></TouchableOpacity>
                    {startPickerShow && (
                        <DateTimePicker
                            testID = "dateTimePicker"
                            value = {startDate}
                            mode = {mode}
                            is24Hour = {true}
                            onChange = {onStartChange}
                        />
                    )}
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">End Date</Text>
                    <TouchableOpacity control = {control} name = "endDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]" onPress = {showEndDatepicker}>
                        <Text style = {{ "color": colours.black }} className = "font-bold text-[16px]">
                            {endDate.toLocaleString("en-GB", options)}
                        </Text>
                    </TouchableOpacity>
                    {endPickerShow && (
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
                    <Text className = "mr-4 w-16">Reminder Date</Text>
                    <TouchableOpacity control = {control} name = "reminderDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]" onPress = {showReminderDatepicker}>
                        <Text style = {{ "color": colours.black }} className = "font-bold text-[16px]">
                            {reminderDate.toLocaleString("en-GB", options)}
                        </Text>
                    </TouchableOpacity>
                    {reminderPickerShow && (
                        <DateTimePicker
                            value = {reminderDate}
                            mode = {mode}
                            is24Hour = {true}
                            onChange = {onReminderChange}
                        />
                    )}
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">Additional Notes</Text>
                    <Controller control = {control} name = "notes" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} numberOfLines = {5} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px]">
                    {/* // TODO: Before submitting, check if the End Date is after the Start Date */}
                    {/* // TODO: Before submitting, check if the Reminder Date is in-between or on the Start Date and End Date */}
                    <Text style = {{ "color": colours.black }} className = "font-bold text-xl">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SetGoal;
