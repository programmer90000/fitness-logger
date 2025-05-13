import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HouseIcon, ClockIcon, PlusIcon, LineChartIcon, GearIcon } from "../icons/icons.js";
import { colours } from "../../constants/colours.js";

export default function Footer() {

    const styles = StyleSheet.create({
        "container": {
            "backgroundColor": colours.footer_background,
            "color": colours.footer_images,
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "space-evenly",
            "width": "100%",
            "height": "auto",
            "paddingBottom": "1%",
            "paddingTop": "1%",
            "flexDirection": "row",
        },
    });

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
