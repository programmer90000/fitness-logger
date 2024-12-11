import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style.js";
import Footer from "./components/Footer/Footer.js";
import { retrieveData } from "./utils/async-storage.js";
import { loadResource } from "./constants/colours.js";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [colours, setColour] = useState("#FFFFFF");
    const loadResources = async () => {
        try {
            const storedData = await retrieveData("theme");
            console.log("Stored Data:", storedData);
            await new Promise((resolve) => { return setTimeout(resolve, 1000); });
        } catch (error) {
            console.error("Error loading AsyncStorage data:", error);
        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            await loadResources();
            const colours = await loadResource();
            setColour(colours);
            setIsReady(true);
            await SplashScreen.hideAsync();
        };

        initializeApp();
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <View style = {[styles.container, { "backgroundColor": colours.colour_1 }]}> 
            <Text style = {{ "color": colours.colour_15 }}>Open up App.js to start working on your app!</Text>
            <StatusBar style = "auto" />
            <Footer />
        </View>
    );
}
