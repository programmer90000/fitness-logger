import { View } from "react-native";
import { styles } from "./style.js";
import { Link } from "expo-router";

import { HouseIcon, ClockIcon, PlusIcon, LineChartIcon } from "../icons/icons.js";
import Feather from "@expo/vector-icons/Feather";

export default function Footer() {
    return (
        <View style = {styles.container}>
            <Link href = "/" style = {{ "width": 30, "height": 30 }}><HouseIcon size = {30} color = "black" /></Link>
            <Link href = "/" style = {{ "width": 30, "height": 30 }}><ClockIcon size = {30} color = "black" /></Link>
            <Link href = "/" style = {{ "width": 30, "height": 30 }}><PlusIcon size = {30} color = "black" /></Link>
            <Link href = "/" style = {{ "width": 30, "height": 30 }}><LineChartIcon size = {30} color = "black" /></Link>
            <Link href = "/"><Feather name = "settings" size = {24} color = "black" /></Link>
        </View>
    );
}
