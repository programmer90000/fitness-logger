import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style = {{ "flex": 1 }}>
            <Drawer screenOptions = {{ "drawerStyle": { "backgroundColor": "#FF0000" }, "drawerActiveTintColor": "#F1F1F1", "drawerActiveBackgroundColor": "transparent", "drawerInactiveTintColor": "#060606", "drawerInactiveBackgroundColor": "transparent" }}>
                <Drawer.Screen name = "index" options = {{ "drawerLabel": "Home", "title": "Home" }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
