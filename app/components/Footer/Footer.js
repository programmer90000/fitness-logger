import { View } from "react-native";
import { styles } from "./style.js";
import { Link } from "expo-router";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

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
