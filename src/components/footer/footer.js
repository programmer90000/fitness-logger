import { View } from "react-native";
import { Link } from "expo-router";
import { HomeIcon, CalendarDaysIcon, PlusCircleIcon, ChartBarIcon, Cog6ToothIcon } from "react-native-heroicons/solid";
import { colours } from "../../constants/colours.js";

export default function Footer() {
    return (
        <View style = {{ "backgroundColor": colours.footer_background }} className = "absolute bottom-0 w-full flex-row items-center justify-evenly py-[1%]">
            <Link href = "/"><HomeIcon size = {24} color = {colours.footer_images} /></Link>
            <Link href = "/"><CalendarDaysIcon size = {24} color = {colours.footer_images} /></Link>
            <Link href = "/"><PlusCircleIcon size = {24} color = {colours.footer_images} /></Link>
            <Link href = "/"><ChartBarIcon size = {24} color = {colours.footer_images} /></Link>
            <Link href = "/"><Cog6ToothIcon size = {24} color = {colours.footer_images} /></Link>
        </View>
    );
}
