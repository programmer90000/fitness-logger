jest.mock("expo-document-picker", () => { return {
    "getDocumentAsync": jest.fn(() => { return Promise.resolve({
        "type": "success",
        "uri": "file://mock/path/document.pdf",
        "name": "document.pdf",
        "size": 12345,
    }); }),
}; });
