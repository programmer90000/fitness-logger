export const hooks = {
    "beforeAll": () => {
        const fixedDate = new Date("2024-10-21T00:00:00Z");
        const OriginalDate = global.Date;
        global.Date = class extends Date {
            constructor() {
                super();
                return fixedDate;
            }
        };
    },

    "afterAll": () => {
        global.Date = OriginalDate;
    },
};

jest.mock("../app/hooks/useTheme.js", () => { return {
    "useTheme": jest.fn().mockReturnValue({
        "isReady": true,
        "colours": {
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
        },
    }),
}; });
