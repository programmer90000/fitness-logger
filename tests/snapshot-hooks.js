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
