jest.mock("react-native-share", () => { return {
    "open": jest.fn(),
    "shareSingle": jest.fn(),
    "Social": { },
}; });
