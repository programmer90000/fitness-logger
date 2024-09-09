import { View } from "react-native";
import { styles } from "./style.js";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export default function Footer() {
    return (
        <View style = {styles.container}>
            <Entypo name = "home" size = {24} color = "black" />
            <FontAwesome5 name = "history" size = {24} color = "black" />
            <AntDesign name = "plussquare" size = {24} color = "black" />
            <MaterialCommunityIcons name = "chart-line" size = {24} color = "black" />            
            <Feather name = "settings" size = {24} color = "black" />
        </View>
    );
}
