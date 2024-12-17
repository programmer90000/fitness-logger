import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style = {{ "flex": 1 }}>
            <Drawer screenOptions = {{ "headerStyle": { "backgroundColor": "#FF0000" }, "drawerStyle": { "backgroundColor": "#FF0000" }, "drawerActiveTintColor": "#F1F1F1", "drawerActiveBackgroundColor": "transparent", "drawerInactiveTintColor": "#060606", "drawerInactiveBackgroundColor": "transparent", "drawerItemStyle": { "display": "none" }, "unmountOnBlur": true }}>
                <Drawer.Screen name = "index" options = {{ "drawerLabel": "Home", "title": "Home", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-a-new-workout-preset/create-a-new-workout-preset" options = {{ "drawerLabel": "Create A New Workout", "title": "Create A New Workout", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-exercise/create-exercise" options = {{ "drawerLabel": "Create Exercise", "title": "Create Exercise", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-workout/create-workout" options = {{ "drawerLabel": "Begin Workout", "title": "Begin Workout", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/workout-history/workout-history" options = {{ "drawerLabel": "Workout History", "title": "Workout History", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/set-goal/set-goal" options = {{ "drawerLabel": "Set Goal", "title": "Set Goal", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-goals/view-goals" options = {{ "drawerLabel": "View Goals", "title": "View Goals", "drawerItemStyle": { "display": "flex" } }}/>
                <Drawer.Screen name = "screens/upload-download-data/upload-download-data" options = {{ "drawerLabel": "Upload/ Download data", "title": "Upload/ Download data", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/statistics/statistics" options = {{ "drawerLabel": "Statistics", "title": "Statistics", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/badges/badges" options = {{ "drawerLabel": "Badges", "title": "Badges", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/settings/settings" options = {{ "drawerLabel": "Settings", "title": "Settings", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/report-feedback/report-feedback" options = {{ "drawerLabel": "Report Feedback", "title": "Report Feedback", "drawerItemStyle": { "display": "flex" } }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
