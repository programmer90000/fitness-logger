jest.mock("expo-sharing", () => { return {
    "isAvailableAsync": jest.fn(() => { return Promise.resolve(true); }),
    "shareAsync": jest.fn(() => { return Promise.resolve(); }),
}; });
