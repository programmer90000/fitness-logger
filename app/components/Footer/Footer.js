import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./style.js";
import { useNavigation } from "@react-navigation/native";

import { HouseIcon, ClockIcon, PlusIcon, LineChartIcon, GearIcon } from "../icons/icons.js";

export default function Footer() {
    const navigation = useNavigation();
    
    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress = { () => { return navigation.navigate("Home"); }} style = {{ "width": 30, "height": 30 }}>
                <HouseIcon size = {30} color = "black" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }} style = {{ "width": 30, "height": 30 }}>
                <ClockIcon size = {30} color = "black" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }} style = {{ "width": 30, "height": 30 }}>
                <PlusIcon size = {30} color = "black" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }} style = {{ "width": 30, "height": 30 }}>
                <LineChartIcon size = {30} color = "black" />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }} style = {{ "width": 30, "height": 30 }}>
                <GearIcon size = {30} color = "black" />
            </TouchableOpacity>
        </View>
    );
}
