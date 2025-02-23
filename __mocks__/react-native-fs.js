jest.mock("react-native-fs", () => { return {
    "readFile": jest.fn(() => { return Promise.resolve("mocked file content"); }),
    "writeFile": jest.fn(() => { return Promise.resolve(); }),
    "DocumentDirectoryPath": "/mocked/path",
}; });
