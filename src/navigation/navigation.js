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
        <Drawer.Navigator screenOptions = {{ "headerStyle": { "backgroundColor": "#FF0000" }, "drawerStyle": { "backgroundColor": "#FF0000", "width": 240 }, "drawerContentStyle": { "backgroundColor": "transparent" }, "drawerActiveTintColor": "#F1F1F1", "drawerInactiveTintColor": "#060606", "drawerActiveBackgroundColor": "#FF4242" }}>
            <Drawer.Screen name = "Home" component = {Home} />
        </Drawer.Navigator>
    );
}
