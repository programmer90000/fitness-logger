import { View, TouchableOpacity } from "react-native";
import { HomeIcon, CalendarDaysIcon, PlusCircleIcon, ChartBarIcon, Cog6ToothIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { colours } from "../../constants/colours.js";

export default function Footer() {
    const navigation = useNavigation();
    return (
        <View style = {{ "backgroundColor": colours.footer_background }} className = "absolute bottom-0 w-full flex-row items-center justify-evenly py-[1%]">
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }}><HomeIcon size = {24} color = {colours.footer_images} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }}><CalendarDaysIcon size = {24} color = {colours.footer_images} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }}><PlusCircleIcon size = {24} color = {colours.footer_images} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }}><ChartBarIcon size = {24} color = {colours.footer_images} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => { return navigation.navigate("Home"); }}><Cog6ToothIcon size = {24} color = {colours.footer_images} /></TouchableOpacity>
        </View>
    );
}
