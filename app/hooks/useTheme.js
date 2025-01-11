import { useEffect, useState } from "react";
import { retrieveData } from "../utils/async-storage.js";
import { loadResource } from "../constants/colours.js";
import * as SplashScreen from "expo-splash-screen";

export const useTheme = () => {
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

    return { isReady, colours };
};
