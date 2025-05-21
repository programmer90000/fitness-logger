import { AppRegistry } from "react-native";
import NavigationWrapper from "./src/navigation/navigation-wrapper.js";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => { return NavigationWrapper; });
