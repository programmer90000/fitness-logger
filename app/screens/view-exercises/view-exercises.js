import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import Realm from "realm";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { exercises } from "../../../database/realm-database.js";

const ViewExercise = () => {
    const { isReady, colours } = useTheme();
    const [exercisesList, setExercisesList] = useState([]);
    const [realmInstance, setRealmInstance] = useState(null);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [exercises] });
        setRealmInstance(realm);
        const allExercises = realm.objects("Exercises");
        setExercisesList(allExercises);

        const listener = () => {
            setExercisesList([...realm.objects("Exercises")]);
        };
        realm.addListener("change", listener);

        return () => {
            realm.removeListener("change", listener);
            realm.close();
        };
    }, [isReady]);

    if (!isReady) {
        return null;
    }
    
    
    const deleteExercise = (exerciseId) => {
        if (!realmInstance) { return; }

        try {
            realmInstance.write(() => {
                const exerciseToDelete = realmInstance.objectForPrimaryKey("Exercises", exerciseId);
                if (exerciseToDelete) {
                    realmInstance.delete(exerciseToDelete);
                }
            });

            setExercisesList((exercise) => { return exercise.filter((item) => { return item.id !== exerciseId; }); });
        } catch (error) {
            console.error("Failed to delete exercise:", error);
        }
    };

    const confirmDelete = (exerciseId) => {
        Alert.alert(
            "Delete Exercise",
            "Are you sure you want to delete this exercise?",
            [
                { "text": "Cancel", "style": "cancel" },
                { "text": "Delete", "style": "destructive", "onPress": () => { return deleteExercise(exerciseId); } },
            ],
        );
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            {exercisesList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No exercises available</Text>
            ) : (
                exercisesList.map((exercise) => { return (
                    <TouchableOpacity key = {exercise.id} className = "flex-row p-2.5 h-20 justify-between items-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }} >
                        <Text className = "text-xl text-left flex-1" style = {{ "color": colours.button_text_1 }}>{exercise.name}</Text>
                        <View className = "flex-row justify-end items-center">
                            <Ionicons name = "pencil" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} />
                            <Ionicons name = "trash" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} onPress = {() => { return confirmDelete(exercise.id); }} />
                        </View>
                    </TouchableOpacity>
                ); })
            )}
        </ScrollView>
    );
};

export default ViewExercise;
