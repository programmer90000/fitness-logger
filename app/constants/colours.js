import { retrieveData } from "../utils/async-storage.js";

const light_mode = {
    "main_background": "#F1F1F1",
    "colour_1": "#FFFFFF", // White
    "colour_2": "#F1F1F1", // Very Light Grey
    "colour_3": "#000000", // Black
    "colour_4": "#060606", // Dark Grey
    "colour_5": "#DEDEDE", // Light Grey
    "colour_6": "#F0F0F0", // Very Light Grey
    "colour_7": "#FF0000", // Red
    "colour_8": "#D10000", // Strong Red
    "colour_9": "#E26A00", // Dark Orange
    "colour_10": "#FB8C00", // Orange
    "colour_11": "#FFA726", // Vivid Orange
    "colour_12": "#2296F3", // Vivid Blue
    "colour_13": "#F1F8FF", // Very Light Blue
    "colour_14": "#F6F8FA", // Grayish Blue
    "colour_15": "#FFD700", // Yellow
};

const dark_mode = {
    "main_background": "#0A0A0A",
    "colour_1": "#000000", // Black
    "colour_2": "#0A0A0A", // Very Dark Grey
    "colour_3": "#FFFFFF", // White
    "colour_4": "#F0F0F0", // Very Light Grey
    "colour_5": "#7F7F7F", // Dark Grey
    "colour_6": "#ACACAC", // Grey
    "colour_7": "#B71C1C", // Strong Red
    "colour_8": "#B71C1C", // Strong Red
    "colour_9": "#121212", // Very Dark Grey
    "colour_10": "#1D1D1D", // Very Dark Grey
    "colour_11": "#333333", // Very Dark Grey
    "colour_12": "#005EA8", // Dark Blue
    "colour_13": "#F1F8FF", // Very Light Blue
    "colour_14": "#F6F8FA", // Grayish Blue
    "colour_15": "#FFAB00", // Orange
};

const loadResource = async () => {
    let colours;
    try {
        const theme = await retrieveData("theme");
        if (theme) {
            console.log("The theme is: ", theme);
            colours = theme === "dark" ? dark_mode : light_mode;
        } else {
            colours = light_mode;
        }
    } catch (error) {
        console.error("Error loading AsyncStorage data:", error);
        colours = light_mode;
    }
    return colours;
};

export { loadResource };

export { light_mode as colours };
