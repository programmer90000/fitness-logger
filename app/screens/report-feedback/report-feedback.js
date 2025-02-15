import React, { useState } from "react";
import { ScrollView, Text, TextInput, Alert, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const ReportFeedback = () => {    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const { isReady, colours } = useTheme();

    const trimFeedbackData = (data) => {
        return {
            "title": data.title.trim(),
            "description": data.description.trim(),
        };
    };

    const handleSubmit = () => {
        if (!title || !description) {
            Alert.alert("Please fill out all fields before sending.");
            return;
        }
        
        setTitle(trimFeedbackData(title));
        setDescription(trimFeedbackData(description));

        const to = "test564756@outlook.com"; // ! Replace with my actual email address
        const subject = `Feedback: ${title}`;
        const body = `Description: ${description}`;

        const emailUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(emailUrl).catch((err) => { return console.error("Error opening email", err); });
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <TextInput placeholder = "Title" value = {title} onChangeText = {setTitle} style = {{ "backgroundColor": colours.input_field_background_1 }} className = {"align-middle text-center w-11/12 h-12 flex-1 m-2.5 border-0"} />
            <TextInput placeholder = "Description" value = {description} onChangeText = {setDescription} multiline style = {{ "backgroundColor": colours.input_field_background_1 }} className = {"align-middle text-center w-11/12 h-12 flex-1 m-2.5 border-transparent"} />
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[15px]" onPress = {handleSubmit}>
                <Text style = {{ "color": colours.button_text_1 }} className = "font-bold text-3xl text-center">Send Email</Text>
            </TouchableOpacity>
            
        </ScrollView>
    );
};

export default ReportFeedback;
