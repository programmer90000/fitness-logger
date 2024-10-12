import { ScrollView, View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

const styles = StyleSheet.create({
    "badge": {
        "margin": 20,
    },
    "text": {
        "fontSize": 16,
        "fontWeight": "bold",
        "textAlign": "center",
    },
});

export default function Footer() {
    return (
        <ScrollView contentContainerStyle = {{ "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 1</Text>
                <MaterialCommunityIcons name = "shoe-cleat" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 2</Text>
                <FontAwesome6 name = "dumbbell" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 3</Text>
                <FontAwesome6 name = "mountain" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 4</Text>
                <Entypo name = "star" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 5</Text>
                <FontAwesome6 name = "medal" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 6</Text>
                <Entypo name = "heart" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 7</Text>
                <FontAwesome6 name = "fire" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 8</Text>
                <FontAwesome6 name = "trophy" size = {100} color = "black" />
            </View>
            <View style = {styles.badge}>
                <Text style = {styles.text}>Badge 9</Text>
                <FontAwesome6 name = "bottle-water" size = {100} color = "black" />
            </View>
        </ScrollView>
    );
}
