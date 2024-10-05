import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style = {{ "flex": 1 }}>
            <Drawer screenOptions = {{ "headerStyle": { "backgroundColor": "#FF0000" }, "drawerStyle": { "backgroundColor": "#FF0000" }, "drawerActiveTintColor": "#F1F1F1", "drawerActiveBackgroundColor": "transparent", "drawerInactiveTintColor": "#060606", "drawerInactiveBackgroundColor": "transparent" }}>
                <Drawer.Screen name = "index" options = {{ "drawerLabel": "Home", "title": "Home" }} />
                <Drawer.Screen name = "components/create-a-new-workout-preset/create-a-new-workout-preset" options = {{ "drawerLabel": "Create A New Workout", "title": "Create A New Workout" }} />
                <Drawer.Screen name = "components/create-exercise/create-exercise" options = {{ "drawerLabel": "Create Exercise", "title": "Create Exercise" }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
