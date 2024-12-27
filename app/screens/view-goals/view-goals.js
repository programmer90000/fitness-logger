import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Realm from "realm";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { goals } from "../../../database/realm-database.js";

const ViewGoals = () => {
    const { isReady, colours } = useTheme();
    const [goalList, setGoalList] = useState([]);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [goals] });
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

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            {goalList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No goals available</Text>
            ) : (
                goalList.map((goal) => { return (
                    <TouchableOpacity key = {goal.id} className = "flex-row p-2.5 h-20 justify-between items-center mt-1.5 w-4/5 self-center mb-1.5" style = {{ "backgroundColor": colours.button_background_1 }} >
                        <Text className = "text-xl text-left flex-1" style = {{ "color": colours.button_text_1 }}>{goal.name}</Text>
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

export default ViewGoals;
