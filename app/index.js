import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSettings } from "./screens/settings/settings.js";
import { styles } from "./style.js";
import Footer from "./components/Footer/Footer.js";

const initializeStorage = async () => {
    const defaultValues = {
        "theme": "light",
        "weight": "metric",
        "distance": "kilometers",
    };
        
    try {
        for (const [key, value] of Object.entries(defaultValues)) {
            const existingKey = await AsyncStorage.getItem(key);
            if (existingKey === null) { await AsyncStorage.setItem(key, JSON.stringify(value)); }
        }
    } catch (error) {
        console.error("Error initializing default values:", error);
    }
};

const App = () => {
    const { theme, weight, distance } = useSettings();

    useEffect(() => {
        initializeStorage();
        console.log(theme);
        console.log(weight);
        console.log(distance);
    }, []);
    return (
        <View style = {styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style = "auto" />
            <Footer />
        </View>
    );
};

export default App;
