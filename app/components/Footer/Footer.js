import { View } from "react-native";
import { styles } from "./style.js";
import { useNavigation } from "@react-navigation/native";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

export default function Footer() {
    const navigation = useNavigation();

    return (
        <View style = {styles.container}>
            <Entypo name = "home" size = {24} color = "black" onPress = {() => { return navigation.navigate("index"); }} />
            <FontAwesome5 name = "history" size = {24} color = "black" onPress = {() => { return navigation.navigate("screens/create-a-new-workout-preset/create-a-new-workout-preset"); }} />
            <AntDesign name = "plussquare" size = {24} color = "black" onPress = {() => { return navigation.navigate("screens/create-workout/create-workout"); }} />
            <MaterialCommunityIcons name = "chart-line" size = {24} color = "black" onPress = {() => { return navigation.navigate("screens/statistics/statistics"); }} />
            <Feather name = "settings" size = {24} color = "black" onPress = {() => { return navigation.navigate("screens/settings/settings"); }} />
        </View>
    );
}
