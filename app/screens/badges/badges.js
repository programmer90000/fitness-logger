import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Ionicons } from "react-native-vector-icons";
import Realm from "realm";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours.js";
import { badges } from "../../../database/realm-database.js";
import { useRouter } from "expo-router";

export default function Badges() {
    const router = useRouter();
    const { isReady, colours } = useTheme();
    const [badgesList, setBadgesList] = useState([]);
    const [realmInstance, setRealmInstance] = useState(null);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const realm = new Realm({ "schema": [badges] });
        setRealmInstance(realm);
        const allBadges = realm.objects("Badges");
        setBadgesList(allBadges);

        const listener = () => {
            setBadgesList([...realm.objects("Badges")]);
        };
        realm.addListener("change", listener);

        return () => {
            realm.removeListener("change", listener);
            realm.close();
        };
    }, [isReady]);

    const toggleBadgeCompletion = (badge) => {
        if (realmInstance) {
            realmInstance.write(() => {
                const badgeToUpdate = realmInstance.objectForPrimaryKey("Badges", badge.id);
                if (badgeToUpdate) {
                    badgeToUpdate.completed = !badgeToUpdate.completed;
                }
            });
        }
    };
    
    const deleteBadge = (badgeId) => {
        if (!realmInstance) { return; }

        try {
            realmInstance.write(() => {
                const badgeToDelete = realmInstance.objectForPrimaryKey("Badges", badgeId);
                if (badgeToDelete) {
                    realmInstance.delete(badgeToDelete);
                }
            });

            setBadgesList((badges) => { return badges.filter((item) => { return item.id !== badgeId; }); });
        } catch (error) {
            console.error("Failed to delete badge:", error);
        }
    };

    const confirmDelete = (badgeId) => {
        Alert.alert(
            "Delete Badge",
            "Are you sure you want to delete this badge?",
            [
                { "text": "Cancel", "style": "cancel" },
                { "text": "Delete", "style": "destructive", "onPress": () => { return deleteBadge(badgeId); } },
            ],
        );
    };
        
    const handleEditBadge = (badgeId) => {
        const badge = realmInstance.objectForPrimaryKey("Badges", badgeId);
        if (badge) {
            router.push({
                "pathname": "/screens/create-badge/create-badge",
                "params": {
                    "id": badge.id,
                    "image": badge.image,
                    "text": badge.text,
                },
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
            "paddingTop": 4,
        },
        "icons": {
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
                    <View key = {badge.id} style = {styles.badge}>
                        <TouchableOpacity key = {badge.id} style = {styles.badge} onPress = {() => { return toggleBadgeCompletion(badge); }}>
                            <Text className = "text-xl text-center" style = {styles.text}>{badge.text}</Text>
                            <FontAwesome6 name = "trophy" size = {100} style = {badge.completed ? styles.completed : styles.unCompleted} />
                        </TouchableOpacity>
                        <View style = {{ "display": "flex", "flexDirection": "row", "justifyContent": "center", "gap": 30 }}>
                            <Ionicons name = "pencil" size = {24} color = {colours.button_icon_2} style = {styles.icons} onPress = {() => { return handleEditBadge(badge.id); }} />
                            <Ionicons name = "trash" size = {24} color = {colours.button_icon_2} style = {styles.icons} onPress = {() => { return confirmDelete(badge.id); }} />
                        </View>
                    </View>
                ); })
            )}
        </ScrollView>
    );
}
