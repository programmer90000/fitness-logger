import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style = {{ "flex": 1 }}>
            <Drawer screenOptions = {{ "headerStyle": { "backgroundColor": "#FF0000" }, "drawerStyle": { "backgroundColor": "#FF0000" }, "drawerActiveTintColor": "#F1F1F1", "drawerActiveBackgroundColor": "transparent", "drawerInactiveTintColor": "#060606", "drawerInactiveBackgroundColor": "transparent", "drawerItemStyle": { "display": "none" }, "unmountOnBlur": true }}>
                <Drawer.Screen name = "index" options = {{ "drawerLabel": "Home", "title": "Home", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-a-new-workout-preset/create-a-new-workout-preset" options = {{ "drawerLabel": "Create A New Workout", "title": "Create A New Workout", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-workout-preset/view-workout-preset" options = {{ "drawerLabel": "View Workout Presets", "title": "View Workout Presets", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-individual-workout-presets/view-individual-workout-presets" options = {{ "drawerLabel": "View Individual Workout Presets", "title": "View Individual Workout Presets", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/create-exercise/create-exercise" options = {{ "drawerLabel": "Create Exercise", "title": "Create Exercise", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-exercises/view-exercises" options = {{ "drawerLabel": "View Exercises", "title": "View Exercises", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-individual-exercises/view-individual-exercises" options = {{ "drawerLabel": "View Individual Exercises", "title": "View Individual Exercises", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/create-workout/create-workout" options = {{ "drawerLabel": "Begin Workout", "title": "Begin Workout", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/record-workout/record-workout" options = {{ "drawerLabel": "Record Workout", "title": "Record Workout", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/workout-history/workout-history" options = {{ "drawerLabel": "Workout History", "title": "Workout History", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-previous-workout/view-previous-workout" options = {{ "drawerLabel": "View Previous Workout", "title": "View Previous Workout", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/set-goal/set-goal" options = {{ "drawerLabel": "Set Goal", "title": "Set Goal", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-goals/view-goals" options = {{ "drawerLabel": "View Goals", "title": "View Goals", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-individual-goals/view-individual-goals" options = {{ "drawerLabel": "View Individual Goals", "title": "View Individual Goals", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/backup-restore-data/backup-restore-data" options = {{ "drawerLabel": "Backup/ Restore data", "title": "Backup/ Restore data", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/statistics/statistics" options = {{ "drawerLabel": "Statistics", "title": "Statistics", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-badge/create-badge" options = {{ "drawerLabel": "Create Badge", "title": "Create Badge", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/badges/badges" options = {{ "drawerLabel": "Badges", "title": "Badges", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/calculator/calculator" options = {{ "drawerLabel": "Calculator", "title": "Calculator", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/settings/settings" options = {{ "drawerLabel": "Settings", "title": "Settings", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/report-feedback/report-feedback" options = {{ "drawerLabel": "Report Feedback", "title": "Report Feedback", "drawerItemStyle": { "display": "flex" } }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
