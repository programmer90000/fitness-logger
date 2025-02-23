jest.mock("react-native-document-picker", () => { return {
    "pick": jest.fn().mockResolvedValue([{ "uri": "file://mock.pdf", "type": "application/pdf", "name": "mock.pdf" }]),
}; });
