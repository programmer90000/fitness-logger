import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "../../components/dropdown-box/dropdown-box.js";
import { goals } from "../../../database/realm-database.js";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { useRouter, useLocalSearchParams } from "expo-router";

const SetGoal = () => {
    const router = useRouter();
    const { control, getValues, reset } = useForm({});
    const [mode, setMode] = useState("date");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reminderDate, setReminderDate] = useState(new Date());
    const [startPickerShow, setStartPickerShow] = useState(false);
    const [endPickerShow, setEndPickerShow] = useState(false);
    const [reminderPickerShow, setReminderPickerShow] = useState(false);
    const [type, setType] = useState(null);
    const { isReady, colours } = useTheme();
    
    const { id, goalName, selectedGoalType, goalValue, goalStartDate, goalEndDate, goalReminders, goalNotes } = useLocalSearchParams();

    useEffect(() => {
        if (id || goalName || selectedGoalType || goalValue || goalStartDate || goalEndDate || goalReminders || goalNotes) {
            reset({
                "goalName": goalName || "",
                "goalValue": goalValue || "",
                "notes": goalNotes || "",
            });
            setType(selectedGoalType || null);
            setStartDate(goalStartDate ? new Date(goalStartDate) : new Date());
            setEndDate(goalEndDate ? new Date(goalEndDate) : new Date());
            setReminderDate(goalReminders ? new Date(goalReminders) : new Date());
        }
    }, [id, goalName, selectedGoalType, goalValue, goalStartDate, goalEndDate, goalReminders, goalNotes]);


    if (!isReady) {
        return null;
    }

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
            if (id) {
                const existingGoal = realm.objectForPrimaryKey("Goals", parseInt(id));
                if (existingGoal) {
                    existingGoal.name = formValues.goalName;
                    existingGoal.type = type;
                    existingGoal.value = formValues.goalValue;
                    existingGoal.startDate = startDate;
                    existingGoal.endDate = endDate;
                    existingGoal.reminders = reminderDate;
                    existingGoal.notes = formValues.notes;
                }
            } else {
                const currentHighestId = realm.objects("Goals").max("id") || 0;
                let newId;

                if (currentHighestId === 0)
                {
                    newId = 1;
                } else {
                    newId = currentHighestId + 1;
                }
            
                realm.create("Goals", { "id": newId, "name": formValues.goalName, "type": type, "value": formValues.goalValue, "startDate": startDate, "endDate": endDate, "reminders": reminderDate, "notes": formValues.notes });
            }
        });
        realm.close();
        reset({ "goalName": "", "goalValue": "", "notes": "" });
        setStartDate(new Date());
        setEndDate(new Date());
        setReminderDate(new Date());
        setType(null);
        router.push({ "pathname": "/screens/set-goal/set-goal", "params": {} }); };

    
    const possibleGoals = [
        { "label": "Increase Weight", "value": "weight" },
        { "label": "Increase Reps", "value": "reps" },
        { "label": "Number Of Workouts", "value": "numWorkouts" },
    ];

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>Name</Text>
                    <Controller control = {control} name = "goalName" render = {({ "field": { onChange, onBlur, value } }) => {
                        return (
                            <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5" style = {{ "backgroundColor": colours.input_field_background_1 }} />
                        ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>Goal</Text>
                    <Controller control = {control} name = "goal" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <DropdownComponent data = {possibleGoals} value = {type} onChange = {setType} className = "align-middle text-center w-[260px] flex-1 m-2.5]" style = {{ "backgroundColor": colours.input_field_background_1 }} placeholderStyle = {{ "color": colours.button_text_1 }} selectedTextStyle = {{ "color": colours.button_text_1 }} />
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>New Goal Value</Text>
                    <Controller control = {control} name = "goalValue" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} keyboardType = "numeric" className = "align-middle text-center w-11/12 flex-1 m-2.5" style = {{ "backgroundColor": colours.input_field_background_1 }}/>
                    ); }}
                    />
                </View>
                <View className = "flex-row items-center">
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>Start Date</Text>
                    <TouchableOpacity control = {control} name = "startDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5" style = {{ "backgroundColor": colours.input_field_background_1 }} onPress = {showStartDatepicker}><Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-[16px]">{startDate.toLocaleString("en-GB", options)}</Text></TouchableOpacity>
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
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>End Date</Text>
                    <TouchableOpacity control = {control} name = "endDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5" style = {{ "backgroundColor": colours.input_field_background_1 }} onPress = {showEndDatepicker}>
                        <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-[16px]">
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
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>Reminder Date</Text>
                    <TouchableOpacity control = {control} name = "reminderDate" className = "mt-[100px] bg-[#2296f3] p-2 m-[5px] align-middle text-center w-11/12 flex-1 m-2.5" style = {{ "backgroundColor": colours.input_field_background_1 }} onPress = {showReminderDatepicker}>
                        <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-[16px]">
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
                    <Text className = "mr-4 w-16" style = {{ "color": colours.heading_colour_1 }}>Additional Notes</Text>
                    <Controller control = {control} name = "notes" render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} numberOfLines = {5} className = "align-middle text-center w-11/12 flex-1 m-2.5" style = {{ "backgroundColor": colours.input_field_background_1 }}/>
                    ); }}
                    />
                </View>
                <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px]" onPress = {handleAddGoal}>
                    {/* // TODO: Before submitting, check if the End Date is after the Start Date */}
                    {/* // TODO: Before submitting, check if the Reminder Date is in-between or on the Start Date and End Date */}
                    <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-xl">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SetGoal;
