import { useEffect, useState } from "react";
import { retrieveData } from "../utils/async-storage.js";
import { loadResource } from "../constants/colours.js";

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
        };

        initializeApp();
    }, []);

    return { isReady, colours };
};
