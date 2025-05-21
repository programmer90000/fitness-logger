import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "../screens/home/App.js";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Home" component = {App} />
        </Stack.Navigator>
    );
}
