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

jest.mock("@react-navigation/native", () => { return {
    ...jest.requireActual("@react-navigation/native"),
    "useNavigation": () => { return {
        "navigate": jest.fn(),
        "goBack": jest.fn(),
    }; },
    "useRoute": () => { return {
        "params": {},
    }; },
}; });

jest.mock("react-native-bootsplash", () => {
    return {
        "hide": jest.fn().mockResolvedValue(),
        "show": jest.fn().mockResolvedValue(),
        "getVisibilityStatus": jest.fn().mockResolvedValue(),
    };
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("react-native/Libraries/Utilities/Platform", () => { return {
    "OS": "android",
    "select": jest.fn((obj) => { return obj.android; }),
}; });
