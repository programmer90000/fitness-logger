import { ScrollView, View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { useSettings } from "../settings/settings.js";

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
        "color": "#FFD700",
    },
    "unCompleted": {
        "color": "#000000",
    },
});

export default function Badges() {
    const { theme } = useSettings();

    return (
        <ScrollView contentContainerStyle = {{ "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.completed]}>Badge 1</Text>
                <MaterialCommunityIcons name = "shoe-cleat" size = {100} style = {styles.completed} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.completed]}>Badge 2</Text>
                <FontAwesome6 name = "dumbbell" size = {100} style = {styles.completed} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.completed]}>Badge 3</Text>
                <FontAwesome6 name = "mountain" size = {100} style = {styles.completed} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.completed]}>Badge 4</Text>
                <Entypo name = "star" size = {100} style = {styles.completed} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.completed]}>Badge 5</Text>
                <FontAwesome6 name = "medal" size = {100} style = {styles.completed} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.unCompleted]}>Badge 6</Text>
                <Entypo name = "heart" size = {100} style = {styles.unCompleted} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.unCompleted]}>Badge 7</Text>
                <FontAwesome6 name = "fire" size = {100} style = {styles.unCompleted} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.unCompleted]}>Badge 8</Text>
                <FontAwesome6 name = "trophy" size = {100} style = {styles.unCompleted} />
            </View>
            <View style = {styles.badge}>
                <Text style = {[styles.text, styles.unCompleted]}>Badge 9</Text>
                <FontAwesome6 name = "bottle-water" size = {100} style = {styles.unCompleted} />
            </View>
        </ScrollView>
    );
}
