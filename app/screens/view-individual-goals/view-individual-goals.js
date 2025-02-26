import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { goals } from "../../../database/realm-database.js";
import { useRoute } from "@react-navigation/native";

const ViewGoalDetails = () => {
    const [goal, setGoal] = useState(null);
    const [realmInstance, setRealmInstance] = useState(null);
    const { isReady, colours } = useTheme();
    
    const route = useRoute();
    const { id } = route.params || {};

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [goals] });
        setRealmInstance(realm);

        const goalDetails = realm.objectForPrimaryKey("Goals", parseInt(id));
        setGoal(goalDetails);

        return () => {
            realm.close();
        };
    }, [isReady, id]);

    if (!goal) {
        return <Text>Loading...</Text>;
    }
    
    const formatDate = (dateProvided) => {
        if (dateProvided instanceof Date) { return dateProvided.toLocaleDateString(); }
        return dateProvided;
    };

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Name</Text>
                <Text className = "text-center text-xl">{goal.name}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Type:</Text>
                <Text className = "text-center text-xl">{goal.type}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Value:</Text>
                <Text className = "text-center text-xl">{goal.value}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Start Date:</Text>
                <Text className = "text-center text-xl">{formatDate(goal.startDate)}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">End Date</Text>
                <Text className = "text-center text-xl">{formatDate(goal.endDate)}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Reminder Date</Text>
                <Text className = "text-center text-xl">{formatDate(goal.reminders)}</Text>
                <Text style = {{ "backgroundColor": colours.button_background_1 }} className = "w-full text-3xl mt-2 text-center p-2">Notes</Text>
                <Text className = "text-center text-xl">{goal.notes}</Text>
            </View>
        </ScrollView>
    );
};

export default ViewGoalDetails;
