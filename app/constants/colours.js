import { retrieveData } from "../utils/async-storage.js";

const light_mode = {
    "main_background": "#F1F1F1",
    "button_background_1": "#FF0000",
    "button_background_2": "#F1F1F1",
    "button_text_1": "#060606",
    "text_1": "#060606",
    "input_field_background_1": "#DEDEDE",
    "badge_completed": "#FFD700",
    "badge_uncompleted": "#000000",
    "footer_background": "#D10000",
    "footer_images": "#060606",
    "statistics_title": "#F6F8FA",
    "statistics_head": "#F1F8FF",
    "heading_colour_1": "#000000",
    "heading_colour_2": "#060606",
};

const dark_mode = {
    "main_background": "#1A1A1A",
    "button_background_1": "#990000",
    "button_background_2": "#2A2A2A",
    "button_text_1": "#FFFFFF",
    "text_1": "#FFFFFF",
    "input_field_background_1": "#3A3A3A",
    "badge_completed": "#FFC700",
    "badge_uncompleted": "#FFFFFF",
    "footer_background": "#990000",
    "footer_images": "#FFFFFF",
    "statistics_title": "#C0C0C0",
    "statistics_head": "#1E293B",
    "heading_colour_1": "#FFFFFF",
    "heading_colour_2": "#E0E0E0",
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
