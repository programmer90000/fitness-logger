import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Realm from "realm";
import Video from "react-native-video";
import { useTheme } from "../../hooks/useTheme.js";
import { exercises } from "../../../database/realm-database.js";
import { useRoute } from "@react-navigation/native";

const ViewExerciseDetails = () => {
    const [exercise, setExercise] = useState(null);
    const [realmInstance, setRealmInstance] = useState(null);
    const { isReady, colours } = useTheme();
    
    const route = useRoute();
    const { id } = route.params || {};

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

    const getAllWorkedMuscles = () => {
        const workedMuscles = new Set([...exercise.primaryMuscles, ...exercise.secondaryMuscles]);
        const allMuscles = new Set(["Pectorals", "Upper back", "Lower back", "Deltoids", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Obliques", "Cardio"]);
        const unworkedMuscles = [...allMuscles].filter((muscle) => { return !workedMuscles.has(muscle); });
        
        return {
            "worked": [...workedMuscles],
            "unworked": unworkedMuscles,
        };
    };

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
                <Video source = {{ "uri": exercise.video }} style = {{ "width": "100%", "height": 300 }} resizeMode = "contain" controls = {true} />
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Personal Best</Text>
                <Text className = "text-center text-xl">{exercise.personalBest}</Text>
                <View className = "mt-10">
                    <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Muscles Worked:</Text>
                    <Text className = "text-center text-xl">{getAllWorkedMuscles().worked.join(", ")}</Text>
                    <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Muscles Not Worked:</Text>
                    <Text className = "text-center text-xl">{getAllWorkedMuscles().unworked.join(", ")}</Text>
                </View>

            </View>
        </ScrollView>
    );
};

export default ViewExerciseDetails;
