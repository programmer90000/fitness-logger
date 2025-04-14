jest.mock("expo-file-system", () => { return {
    "readAsStringAsync": jest.fn(() => { return Promise.resolve("mock file content"); }),
    "getInfoAsync": jest.fn(() => { return Promise.resolve({ "exists": true }); }),
}; });
