import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { badges } from "../../../database/realm-database.js";
import Realm from "realm";
import UploadMedia from "../../components/upload-media/upload-media";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";

const CreateBadge = () => {
    const router = useRouter();
    const [imagePath, setImagePath] = useState(null);
    const { control, handleSubmit, getValues, setValue, reset } = useForm({});
    const route = useRoute();
    const { id, image, text } = route.params || {};

    useEffect(() => {
        if (id || image || text) {
            setValue("badgeText", text || "");
            setImagePath(image || null);
        }
    }, [id, image, text, setValue]);

    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    const trimBadgeData = (formValues) => {
        return {
            ...formValues,
            "badgeText": formValues.badgeText?.trim(),
        };
    };

    const checkForDuplicateName = (realm, name) => {
        const existingItem = realm.objects("Badges").filtered("text == $0", name);
        return existingItem.length > 0;
    };

    const onSubmit = () => {
        const formValues = trimBadgeData(getValues());
        const realm = new Realm({ "schema": [badges] });

        if (checkForDuplicateName(realm, formValues.badgeText)) {
            console.log("Badge name already exists");
            return;
        }

        realm.write(() => {
            if (id) {
                const existingBadge = realm.objectForPrimaryKey("Badges", parseInt(id));
                if (existingBadge) {
                    existingBadge.text = formValues.badgeText;
                    existingBadge.image = imagePath;
                }
            } else {
                const currentHighestId = realm.objects("Badges").max("id") || 0;
                let newId;

                if (currentHighestId === 0) {
                    newId = 1;
                } else {
                    newId = currentHighestId + 1;
                }
            
                realm.create("Badges", { "id": newId, "image": imagePath, "text": formValues.badgeText, "completed": false });
            }
        });
        
        realm.close();
        reset();
        setImagePath(null); 
        setValue("badgeText", ""); 
        router.push({ "pathname": "/screens/create-badge/create-badge", "params": {} });
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Badge Name</Text>
                <Controller control = {control} name = "badgeText" render = {({ "field": { onChange, onBlur, value } }) => { return (<TextInput onBlur = {onBlur} onChangeText = {(text) => { onChange(text); }} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>);
                }} />
                <UploadMedia onMediaSelect = {(path) => { return setImagePath(path); }} mediaFileName = {`${imagePath || "default"}.mp4`} mediaType = "Image" />
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} style = {{ "backgroundColor": colours.button_background_1 }} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Create Badge</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreateBadge;
