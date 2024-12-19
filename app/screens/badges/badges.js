import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { badges } from "../../../database/realm-database.js";

export default function Badges() {
    const { isReady, colours } = useTheme();
    const [badgesList, setBadgesList] = useState([]);
    const [realm, setRealm] = useState(null);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realmInstance = new Realm({ "schema": [badges] });
        setRealm(realmInstance);
        const allBadges = realmInstance.objects("Badges");
        setBadgesList(allBadges);

        const listener = () => {
            setBadgesList([...realmInstance.objects("Badges")]);
        };
        realmInstance.addListener("change", listener);

        return () => {
            realmInstance.removeListener("change", listener);
            realmInstance.close();
        };
    }, [isReady]);

    const toggleBadgeCompletion = (badge) => {
        if (realm) {
            realm.write(() => {
                const badgeToUpdate = realm.objectForPrimaryKey("Badges", badge.id);
                if (badgeToUpdate) {
                    badgeToUpdate.completed = !badgeToUpdate.completed;
                }
            });
        }
    };

    
    const styles = StyleSheet.create({
        "badge": {
            "margin": 20,
        },
        "text": {
            "fontSize": 32,
            "fontWeight": "bold",
            "textAlign": "center",
        },
        "completed": {
            "color": colours.badge_completed,
        },
        "unCompleted": {
            "color": colours.badge_uncompleted,
        },
    });
    
    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }} contentContainerStyle = {{ "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
            
            {badgesList.length === 0 ? (
                <Text className = "text-xl text-center mt-5" style = {{ "color": colours.button_text_1 }}>No badges available</Text>
            ) : (
                badgesList.map((badge) => { return (
                    <View onTouchEnd = {() => { return toggleBadgeCompletion(badge); }} key = {badge.id} style = {styles.badge}>
                        <TouchableOpacity key = {badge.id} style = {styles.badge}>
                            <Text className = "text-xl text-center" style = {styles.text}>{badge.text}</Text>
                            <FontAwesome6 name = "trophy" size = {100} style = {badge.completed ? styles.completed : styles.unCompleted} />
                        </TouchableOpacity>
                    </View>
                ); })
            )}
        </ScrollView>
    );
}
