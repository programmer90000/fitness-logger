import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style.js";
import Footer from "./components/Footer/Footer.js";
import { useTheme } from "./hooks/useTheme.js";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    return (
        <View style = {[styles.container, { "backgroundColor": colours.main_background }]}> 
            <Text style = {{ "color": colours.heading_colour_1 }}>Open up App.js to start working on your app!</Text>
            <StatusBar style = "auto" />
            <Footer />
        </View>
    );
}
