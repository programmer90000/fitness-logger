import { View } from "react-native";
import { styles } from "./style.js";
import { Link } from "expo-router";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export default function Footer() {
    return (
        <View style = {styles.container}>
            <Link href = "/"><Entypo name = "home" size = {24} color = "black" /></Link>
            <Link href = "/"><FontAwesome5 name = "history" size = {24} color = "black" /></Link>
            <Link href = "/"><AntDesign name = "plussquare" size = {24} color = "black" /></Link>
            <Link href = "/"><MaterialCommunityIcons name = "chart-line" size = {24} color = "black" /></Link>            
            <Link href = "/"><Feather name = "settings" size = {24} color = "black" /></Link>
        </View>
    );
}
