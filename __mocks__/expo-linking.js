jest.mock("expo-linking", () => { return {
    "openURL": jest.fn(() => { return Promise.resolve(); }),
    "canOpenURL": jest.fn(() => { return Promise.resolve(true); }),
    "createURL": jest.fn((path) => { return `myapp:///${path}`; }),
    "addEventListener": jest.fn(() => { return {
        "remove": jest.fn(),
    }; }),
    "getInitialURL": jest.fn(() => { return Promise.resolve("myapp:///some/path"); }),
}; });
