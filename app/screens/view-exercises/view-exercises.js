import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Realm from "realm";
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
                    <TouchableOpacity key = {exercise.id} className = "p-2.5 h-20 justify-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }}>
                        <Text className = "text-xl text-center" style = {{ "color": colours.button_text_1 }}>{exercise.name}</Text>
                    </TouchableOpacity>
                ); })
            )}
        </ScrollView>
    );
};

export default ViewExercise;
