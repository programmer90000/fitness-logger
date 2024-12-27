import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import Realm from "realm";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { exercises } from "../../../database/realm-database.js";

const ViewExercise = () => {
    const { isReady, colours } = useTheme();
    const [exercisesList, setExercisesList] = useState([]);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [exercises] });
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
                            <Ionicons name = "trash" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} />
                        </View>
                    </TouchableOpacity>
                ); })
            )}
        </ScrollView>
    );
};

export default ViewExercise;
