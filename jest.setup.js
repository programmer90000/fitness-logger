import "react-native-gesture-handler/jestSetup";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("expo-modules-core", () => {
    return {
        "NativeModulesProxy": {},
        "requireNativeModule": jest.fn(() => { return {}; }),
        "requireOptionalNativeModule": jest.fn(() => { return {}; }), // <== ADD THIS LINE
        "EventEmitter": jest.fn(),
        "Platform": {},
        "CodedError": class CodedError extends Error {},
        "UnavailabilityError": class UnavailabilityError extends Error {},
    };
});


jest.mock("expo-router", () => { return {
    "Link": () => { return null; },
    "Stack": () => { return null; },
    "useRouter": () => { return { "push": jest.fn() }; },
    "useLocalSearchParams": () => { return {}; },
    "useNavigation": () => { return { "navigate": jest.fn() }; },
}; });

jest.mock("react-native-vector-icons/Entypo", () => { return "Entypo"; });
jest.mock("react-native-vector-icons/FontAwesome5", () => { return "FontAwesome5"; });

jest.mock("expo-splash-screen", () => { return {
    "preventAutoHideAsync": jest.fn(),
    "hideAsync": jest.fn(),
};
});

jest.mock("react-native-vector-icons/AntDesign", () => { return "AntDesign"; });
jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => { return "MaterialCommunityIcons"; });
jest.mock("react-native-vector-icons/Feather", () => { return "Feather"; });
jest.mock("react-native-vector-icons/FontAwesome6", () => { return "FontAwesome6"; });
jest.mock("react-native-vector-icons", () => { return "Ionicons"; });

