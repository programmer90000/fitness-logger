export const Link = "Link";
export const useRouter = jest.fn(() => { return {
    "push": jest.fn(),
    "replace": jest.fn(),
    "back": jest.fn(),
    "canGoBack": jest.fn(() => { return true; }),
}; });
export const useLocalSearchParams = jest.fn(() => { return {}; });
export const useSegments = jest.fn(() => { return []; });
export const useNavigation = jest.fn(() => { return {
    "navigate": jest.fn(),
    "goBack": jest.fn(),
}; });
export const Stack = {
    "Screen": "Stack.Screen",
};
export const Tabs = {
    "Screen": "Tabs.Screen",
};
