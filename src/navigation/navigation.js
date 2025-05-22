import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import App from "../screens/home/App.js";

const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component = {App} />
        </Drawer.Navigator>
    );
}
