import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import Realm from "realm";
import { Ionicons } from "react-native-vector-icons";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { previousWorkouts } from "../../../database/realm-database.js";
import { useRouter } from "expo-router";

const ViewWorkouts = () => {
    const { isReady, colours } = useTheme();
    const [previousWorkoutsList, setPreviousWorkoutsList] = useState([]);
    const [realmInstance, setRealmInstance] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [previousWorkouts] });
        setRealmInstance(realm);
        const allPreviousWorkouts = realm.objects("PreviousWorkouts");
        setPreviousWorkoutsList(allPreviousWorkouts);

        const listener = () => {
            setPreviousWorkoutsList([...realm.objects("PreviousWorkouts")]);
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
    
    const deletePreviousWorkout = (previousWorkoutId) => {
        if (!realmInstance) { return; }

        try {
            realmInstance.write(() => {
                const previousWorkoutToDelete = realmInstance.objectForPrimaryKey("PreviousWorkouts", previousWorkoutId);
                if (previousWorkoutToDelete) {
                    realmInstance.delete(previousWorkoutToDelete);
                }
            });

            setPreviousWorkoutsList((previousWorkouts) => { return previousWorkouts.filter((item) => { return item.id !== previousWorkoutId; }); });
        } catch (error) {
            console.error("Failed to delete previous workout:", error);
        }
    };

    const confirmDelete = (previousWorkoutId) => {
        Alert.alert(
            "Delete Previous Workout",
            "Are you sure you want to delete this workout?",
            [
                { "text": "Cancel", "style": "cancel" },
                { "text": "Delete", "style": "destructive", "onPress": () => { return deletePreviousWorkout(previousWorkoutId); } },
            ],
        );
    };

    const handleEditPreviousWorkout = (workoutPresetId) => {
        const workoutPreset = realmInstance.objectForPrimaryKey("PreviousWorkouts", workoutPresetId);
        if (workoutPreset) {
            router.push({
                "pathname": "/screens/record-workout/record-workout",
                "params": {
                    "id": workoutPreset.id,
                    "source": "workout-history",
                },
            });
        }
    };

    const handleViewPreviousWorkout = (previousWorkoutId) => {
        const previousWorkout = realmInstance.objectForPrimaryKey("PreviousWorkouts", previousWorkoutId);
        
        if (previousWorkout) {
            router.push({
                "pathname": "/screens/view-previous-workout/view-previous-workout",
                "params": { "id": previousWorkoutId },
            });
        }
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            {previousWorkoutsList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No workouts completed</Text>
            ) : (
                previousWorkoutsList.map((previousWorkout) => { return (
                    <TouchableOpacity key = {previousWorkout.id} className = "flex-row p-2.5 h-20 justify-between items-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }} onPress = {() => { return handleViewPreviousWorkout(previousWorkout.id); }} >
                        <Text className = "text-xl text-left flex-1" style = {{ "color": colours.button_text_1 }}>{previousWorkout.name}</Text>
                        <View className = "flex-row justify-end items-center">
                            <Ionicons name = "pencil" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} onPress = {() => { return handleEditPreviousWorkout(previousWorkout.id); }} />
                            <Ionicons name = "trash" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} onPress = {() => { return confirmDelete(previousWorkout.id); }} />
                        </View>
                    </TouchableOpacity>
                ); })
            )}
        </ScrollView>
    );
};

export default ViewWorkouts;
