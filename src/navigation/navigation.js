import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/home.js";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Screens() {
    return (
        <Stack.Navigator screenOptions = {{ "headerShown": false }}>
            <Stack.Screen name = "Home" component = {Home} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component = {Home} />
        </Drawer.Navigator>
    );
}
