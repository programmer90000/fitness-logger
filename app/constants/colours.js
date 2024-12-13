import { retrieveData } from "../utils/async-storage.js";

const light_mode = {
    "main_background": "#F1F1F1",
    "button_background_1": "#FF0000",
    "input_field_background_1": "#DEDEDE",
    "badge_completed": "#FFD700",
    "badge_uncompleted": "#000000",
    "footer_background": "#D10000",
    "footer_images": "#060606",
    "colour_1": "#FFFFFF", // White
    "colour_2": "#F1F1F1", // Very Light Grey
    "colour_3": "#000000", // Black
    "colour_4": "#060606", // Dark Grey
    "colour_13": "#F1F8FF", // Very Light Blue
    "colour_14": "#F6F8FA", // Grayish Blue
};

const dark_mode = {
    "main_background": "#0A0A0A",
    "button_background_1": "#FF0000",
    "input_field_background_1": "#7F7F7F",
    "badge_completed": "#FFAB00",
    "badge_uncompleted": "#FFFFFF",
    "footer_background": "#B71C1C",
    "footer_images": "#F0F0F0",
    "colour_1": "#000000", // Black
    "colour_2": "#0A0A0A", // Very Dark Grey
    "colour_3": "#FFFFFF", // White
    "colour_4": "#F0F0F0", // Very Light Grey
    "colour_13": "#F1F8FF", // Very Light Blue
    "colour_14": "#F6F8FA", // Grayish Blue
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
