import React from "react";
import { StatusBar } from "react-native";
import { registerRootComponent } from "expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "./hooks/useTheme.js";

import HomeScreen from "./index";
import CreateWorkoutPreset from "./screens/create-a-new-workout-preset/create-a-new-workout-preset";
import ViewWorkoutPreset from "./screens/view-workout-preset/view-workout-preset";
import ViewIndividualWorkoutPresets from "./screens/view-individual-workout-presets/view-individual-workout-presets";
import CreateExercise from "./screens/create-exercise/create-exercise";
import ViewExercises from "./screens/view-exercises/view-exercises";
import ViewIndividualExercises from "./screens/view-individual-exercises/view-individual-exercises";
import CreateWorkout from "./screens/create-workout/create-workout";
import RecordWorkout from "./screens/record-workout/record-workout";
import WorkoutHistory from "./screens/workout-history/workout-history";
import ViewPreviousWorkout from "./screens/view-previous-workout/view-previous-workout";
import SetGoal from "./screens/set-goal/set-goal";
import ViewGoals from "./screens/view-goals/view-goals";
import ViewIndividualGoals from "./screens/view-individual-goals/view-individual-goals";
import BackupRestoreData from "./screens/backup-restore-data/backup-restore-data";
import Statistics from "./screens/statistics/statistics";
import CreateBadge from "./screens/create-badge/create-badge";
import Badges from "./screens/badges/badges";
import Calculator from "./screens/calculator/calculator";
import Settings from "./screens/settings/settings";
import ReportFeedback from "./screens/report-feedback/report-feedback";

const Drawer = createDrawerNavigator();

export default function App() {
    const { isReady, colours } = useTheme();
    
    if (!isReady) {
        return null;
    }
    
    return (
        <GestureHandlerRootView style = {{ "flex": 1 }}>
            <StatusBar barStyle = "light-content" backgroundColor = {colours.button_background_1} />
            <NavigationContainer>
                <Drawer.Navigator screenOptions = {{ "headerStyle": { "backgroundColor": "#FF0000" }, "drawerStyle": { "backgroundColor": "#FF0000" }, "drawerActiveTintColor": "#F1F1F1", "drawerActiveBackgroundColor": "transparent", "drawerInactiveTintColor": "#060606", "drawerInactiveBackgroundColor": "transparent", "unmountOnBlur": true, "headerShown": true }} >
                    <Drawer.Screen name = "Home" component = {HomeScreen} options = {{ "title": "Home", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "CreateWorkoutPreset" component = {CreateWorkoutPreset} options = {{ "title": "Create Workout Preset", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewWorkoutPreset" component = {ViewWorkoutPreset} options = {{ "title": "View Workout Presets", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewIndividualWorkoutPresets" component = {ViewIndividualWorkoutPresets} options = {{ "title": "View Individual Workout Presets", "drawerItemStyle": { "display": "none" } }} />
                    <Drawer.Screen name = "CreateExercise" component = {CreateExercise} options = {{ "title": "Create Exercise", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewExercises" component = {ViewExercises} options = {{ "title": "View Exercises", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewIndividualExercises" component = {ViewIndividualExercises} options = {{ "title": "View Individual Exercises", "drawerItemStyle": { "display": "none" } }} />
                    <Drawer.Screen name = "CreateWorkout" component = {CreateWorkout} options = {{ "title": "Begin Workout", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "RecordWorkout" component = {RecordWorkout} options = {{ "title": "Record Workout", "drawerItemStyle": { "display": "none" } }} />
                    <Drawer.Screen name = "WorkoutHistory" component = {WorkoutHistory} options = {{ "title": "Workout History", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewPreviousWorkout" component = {ViewPreviousWorkout} options = {{ "title": "View Previous Workout", "drawerItemStyle": { "display": "none" } }} />
                    <Drawer.Screen name = "SetGoal" component = {SetGoal} options = {{ "title": "Set Goal", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewGoals" component = {ViewGoals} options = {{ "title": "View Goals", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ViewIndividualGoals" component = {ViewIndividualGoals} options = {{ "title": "View Individual Goals", "drawerItemStyle": { "display": "none" } }} />
                    <Drawer.Screen name = "BackupRestoreData" component = {BackupRestoreData} options = {{ "title": "Backup/ Restore data", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "Statistics" component = {Statistics} options = {{ "title": "Statistics", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "CreateBadge" component = {CreateBadge} options = {{ "title": "Create Badge", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "Badges" component = {Badges} options = {{
                        "title": "Badges", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "Calculator" component = {Calculator} options = {{ "title": "Calculator", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "Settings" component = {Settings} options = {{ "title": "Settings", "drawerItemStyle": { "display": "flex" } }} />
                    <Drawer.Screen name = "ReportFeedback" component = {ReportFeedback} options = {{ "title": "Report Feedback", "drawerItemStyle": { "display": "flex" } }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

registerRootComponent(App);
