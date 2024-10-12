import { ScrollView, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

const styles = StyleSheet.create({
    "container": {
        "padding": 16,
    },
});

export default function Footer() {
    return (
        <ScrollView contentContainerStyle = {{ "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
            <MaterialCommunityIcons name = "shoe-cleat" size = {100} color = "black" />
            <FontAwesome6 name = "dumbbell" size = {100} color = "black" />
            <FontAwesome6 name = "mountain" size = {100} color = "black" />
            <Entypo name = "star" size = {100} color = "black" />
            <FontAwesome6 name = "medal" size = {100} color = "black" />
            <Entypo name = "heart" size = {100} color = "black" />
            <FontAwesome6 name = "fire" size = {100} color = "black" />
            <FontAwesome6 name = "trophy" size = {100} color = "black" />
            <FontAwesome6 name = "bottle-water" size = {100} color = "black" />
        </ScrollView>
    );
}
