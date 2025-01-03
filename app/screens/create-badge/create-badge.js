import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { badges } from "../../../database/realm-database.js";
import Realm from "realm";
import UploadMedia from "../../components/upload-media/upload-media";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";

const CreateBadge = () => {
    const [badgeText, setBadgeText] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const { control, handleSubmit, getValues, setValue, reset } = useForm({});
    
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    const onSubmit = () => {
        const formValues = getValues();
        const realm = new Realm({ "schema": [badges] });
        realm.write(() => {
            const currentHighestId = realm.objects("Badges").max("id") || 0;
            const newId = currentHighestId + 1;

            realm.create("Badges", {
                "id": newId,
                "image": imagePath,
                "text": badgeText,
                "completed": false,
            });
        });
        
        realm.close();
        reset();
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Badge Name</Text>
                <Controller control = {control} name = "badgeText" render = {({ "field": { onChange, onBlur, value } }) => { return (<TextInput onBlur = {onBlur} onChangeText = {(text) => {
                    onChange(text); 
                    setBadgeText(text);
                }} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                ); }} />
                <UploadMedia onMediaSelect = {(path) => { return setImagePath(path); }} mediaFileName = {`${badgeText}.mp4`} mediaType = "Image" />
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} style = {{ "backgroundColor": colours.button_background_1 }} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Create Badge</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreateBadge;
