global.__DEV__ = true;

jest.mock("@react-native-async-storage/async-storage", () => {
    return {
        "getItem": jest.fn(() => { return Promise.resolve(null); }),
        "setItem": jest.fn(() => { return Promise.resolve(); }),
        "removeItem": jest.fn(() => { return Promise.resolve(); }),
        "clear": jest.fn(() => { return Promise.resolve(); }),
        "getAllKeys": jest.fn(() => { return Promise.resolve([]); }),
        "multiGet": jest.fn(() => { return Promise.resolve([]); }),
        "multiSet": jest.fn(() => { return Promise.resolve(); }),
        "multiRemove": jest.fn(() => { return Promise.resolve(); }),
    };
});
