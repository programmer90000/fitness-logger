import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import Realm from "realm";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { goals } from "../../../database/realm-database.js";
import { useRouter } from "expo-router";

const ViewGoals = () => {
    const router = useRouter();
    const { isReady, colours } = useTheme();
    const [goalList, setGoalList] = useState([]);
    const [realmInstance, setRealmInstance] = useState(null);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [goals] });
        setRealmInstance(realm);
        const allGoals = realm.objects("Goals");
        setGoalList(allGoals);

        const listener = () => {
            setGoalList([...realm.objects("Goals")]);
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
        
    const deleteGoal = (goalId) => {
        if (!realmInstance) { return; }

        try {
            realmInstance.write(() => {
                const goalToDelete = realmInstance.objectForPrimaryKey("Goals", goalId);
                if (goalToDelete) {
                    realmInstance.delete(goalToDelete);
                }
            });

            setGoalList((goals) => { return goals.filter((item) => { return item.id !== goalId; }); });
        } catch (error) {
            console.error("Failed to delete goal:", error);
        }
    };

    const confirmDelete = (goalId) => {
        Alert.alert(
            "Delete Goal",
            "Are you sure you want to delete this goal?",
            [
                { "text": "Cancel", "style": "cancel" },
                { "text": "Delete", "style": "destructive", "onPress": () => { return deleteGoal(goalId); } },
            ],
        );
    };
    
    const handleEditGoal = (goalId) => {
        const goal = realmInstance.objectForPrimaryKey("Goals", goalId);
        if (goal) {
            router.push({
                "pathname": "/screens/set-goal/set-goal",
                "params": {
                    "id": goal.id,
                    "goalName": goal.name,
                    "selectedGoalType": goal.type,
                    "goalValue": goal.value,
                    "goalStartDate": goal.startDate.toISOString(),
                    "goalEndDate": goal.endDate.toISOString(),
                    "goalReminders": goal.reminders.toISOString(),
                    "goalNotes": goal.notes,
                },
            });
        }
    };

    const handleViewGoal = (goalId) => {
        const goal = realmInstance.objectForPrimaryKey("Goals", goalId);
        
        if (goal) {
            router.push({
                "pathname": "/screens/view-individual-goals/view-individual-goals",
                "params": { "id": goalId },
            });
        }
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            {goalList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No goals available</Text>
            ) : (
                goalList.map((goal) => { return (
                    <TouchableOpacity key = {goal.id} className = "flex-row p-2.5 h-20 justify-between items-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }} onPress = {() => { return handleViewGoal(goal.id); }} >
                        <Text className = "text-xl text-left flex-1" style = {{ "color": colours.button_text_1 }}>{goal.name}</Text>
                        <View className = "flex-row justify-end items-center">
                            <Ionicons name = "pencil" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} onPress = {() => { return handleEditGoal(goal.id); } } />
                            <Ionicons name = "trash" size = {24} color = {colours.button_icon_1} style = {{ "marginRight": 10 }} onPress = {() => { return confirmDelete(goal.id); }} />
                        </View>
                    </TouchableOpacity>
                ); })
            )}
        </ScrollView>
    );
};

export default ViewGoals;
