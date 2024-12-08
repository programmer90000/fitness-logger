import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { goals } from "../../../database/realm-database.js";
import Realm from "realm";
import { colours } from "../../constants/colours.js";

const SetGoal = () => {
    const { control, getValues } = useForm({});
    const [mode, setMode] = useState("date");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reminderDate, setReminderDate] = useState(new Date());
    const [startPickerShow, setStartPickerShow] = useState(false);
    const [endPickerShow, setEndPickerShow] = useState(false);
    const [reminderPickerShow, setReminderPickerShow] = useState(false);
    const [type, setType] = useState(null);

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
    
    const handleAddGoal = () => {
        const formValues = getValues();
        const realm = new Realm({ "schema": [goals] });
        realm.write(() => {
            const currentHighestId = realm.objects("Goals").max("id") || 0;
            let newId;

            if (currentHighestId === 0)
            {
                newId = 1;
            } else {
                newId = currentHighestId + 1;
            }
            realm.create("Goals", { "id": newId, "name": formValues.goalName, "type": type, "value": formValues.goalValue, "startDate": startDate, "endDate": endDate, "reminders": reminderDate, "notes": formValues.notes });
        });
        const allGoals = realm.objects("Goals");
        realm.close();
    };

    
    const possibleGoals = [
        { "label": "Increase Weight", "value": "weight" },
        { "label": "Increase Reps", "value": "reps" },
        { "label": "Number Of Workouts", "value": "numWorkouts" },
    ];

    return (
        <ScrollView style = {{ "backgroundColor": colours.colour_2 }}>
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
                        <DropdownComponent data = {possibleGoals} value = {type} onChange = {setType} className = "align-middle text-center w-[260px] flex-1 m-2.5 bg-[#DEDEDE]" />
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">New Goal Value</Text>
                    <Controller control = {control} name = "goalValue" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16">Start Date</Text>
                    <TouchableOpacity control = {control} name = "startDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]" onPress = {showStartDatepicker}><Text style = {{ "color": colours.colour_4 }} className = "font-bold text-[16px]">{startDate.toLocaleString("en-GB", options)}</Text></TouchableOpacity>
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
                        <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-[16px]">
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
                        <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-[16px]">
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
                <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[15px]" onPress = {handleAddGoal}>
                    {/* // TODO: Before submitting, check if the End Date is after the Start Date */}
                    {/* // TODO: Before submitting, check if the Reminder Date is in-between or on the Start Date and End Date */}
                    <Text style = {{ "color": colours.colour_4 }} className = "font-bold text-xl">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SetGoal;
