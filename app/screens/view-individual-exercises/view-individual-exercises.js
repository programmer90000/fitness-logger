import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Realm from "realm";
import Video from "react-native-video";
import { useTheme } from "../../hooks/useTheme.js";
import { exercises } from "../../../database/realm-database.js";
import { useLocalSearchParams } from "expo-router";

const ViewExerciseDetails = () => {
    const [exercise, setExercise] = useState(null);
    const [realmInstance, setRealmInstance] = useState(null);
    const { isReady, colours } = useTheme();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [exercises] });
        setRealmInstance(realm);

        const exercisetDetails = realm.objectForPrimaryKey("Exercises", parseInt(id));
        setExercise(exercisetDetails);

        return () => {
            realm.close();
        };
    }, [isReady, id]);

    if (!exercise) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Name</Text>
                <Text className = "text-center text-xl">{exercise.name}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Type:</Text>
                <Text className = "text-center text-xl">{exercise.type}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Notes:</Text>
                <Text className = "text-center text-xl">{exercise.notes}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Video:</Text>
                <Text className = "text-center text-xl">{exercise.video}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Personal Best</Text>
                <Text className = "text-center text-xl">{exercise.personalBest}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Video</Text>
                <Video source = {{ "uri": exercise.video }} style = {{ "width": "100%", "height": 300 }} resizeMode = "contain" controls = {true} />
            </View>
        </ScrollView>
    );
};

export default ViewExerciseDetails;
