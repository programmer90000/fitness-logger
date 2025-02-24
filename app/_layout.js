import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import App from "./index";
import CreateANewWorkoutPreset from "./screens/create-a-new-workout-preset/create-a-new-workout-preset";
import ViewWorkoutPresets from "./screens/view-workout-preset/view-workout-preset";
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

export default function Layout() {
    return (
        <GestureHandlerRootView style = {{ "flex": 1 }}>
            <Drawer.Navigator screenOptions = {{ "headerStyle": { "backgroundColor": "#FF0000" }, "drawerStyle": { "backgroundColor": "#FF0000" }, "drawerActiveTintColor": "#F1F1F1", "drawerActiveBackgroundColor": "transparent", "drawerInactiveTintColor": "#060606", "drawerInactiveBackgroundColor": "transparent", "unmountOnBlur": true }} >
                <Drawer.Screen name = "index" component = {App} options = {{ "drawerLabel": "Home", "title": "Home", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-a-new-workout-preset/create-a-new-workout-preset" component = {CreateANewWorkoutPreset} options = {{ "drawerLabel": "Create A New Workout Preset", "title": "Create A New Workout Preset", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-workout-preset/view-workout-preset" component = {ViewWorkoutPresets} options = {{ "drawerLabel": "View Workout Presets", "title": "View Workout Presets", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-individual-workout-presets/view-individual-workout-presets" component = {ViewIndividualWorkoutPresets} options = {{ "drawerLabel": "View Individual Workout Presets", "title": "View Individual Workout Presets", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/create-exercise/create-exercise" component = {CreateExercise} options = {{ "drawerLabel": "Create Exercise", "title": "Create Exercise", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-exercises/view-exercises" component = {ViewExercises} options = {{ "drawerLabel": "View Exercises", "title": "View Exercises", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-individual-exercises/view-individual-exercises" component = {ViewIndividualExercises} options = {{ "drawerLabel": "View Individual Exercises", "title": "View Individual Exercises", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/create-workout/create-workout" component = {CreateWorkout} options = {{ "drawerLabel": "Begin Workout", "title": "Begin Workout", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/record-workout/record-workout" component = {RecordWorkout} options = {{ "drawerLabel": "Record Workout", "title": "Record Workout", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/workout-history/workout-history" component = {WorkoutHistory} options = {{ "drawerLabel": "Workout History", "title": "Workout History", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-previous-workout/view-previous-workout" component = {ViewPreviousWorkout} options = {{ "drawerLabel": "View Previous Workout", "title": "View Previous Workout", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/set-goal/set-goal" component = {SetGoal} options = {{ "drawerLabel": "Set Goal", "title": "Set Goal", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-goals/view-goals" component = {ViewGoals} options = {{ "drawerLabel": "View Goals", "title": "View Goals", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/view-individual-goals/view-individual-goals" component = {ViewIndividualGoals} options = {{ "drawerLabel": "View Individual Goals", "title": "View Individual Goals", "drawerItemStyle": { "display": "none" } }} />
                <Drawer.Screen name = "screens/backup-restore-data/backup-restore-data" component = {BackupRestoreData} options = {{ "drawerLabel": "Backup/ Restore data", "title": "Backup/ Restore data", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/statistics/statistics" component = {Statistics} options = {{ "drawerLabel": "Statistics", "title": "Statistics", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/create-badge/create-badge" component = {CreateBadge} options = {{ "drawerLabel": "Create Badge", "title": "Create Badge", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/badges/badges" component = {Badges} options = {{ "drawerLabel": "Badges", "title": "Badges", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/calculator/calculator" component = {Calculator} options = {{ "drawerLabel": "Calculator", "title": "Calculator", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/settings/settings" component = {Settings} options = {{ "drawerLabel": "Settings", "title": "Settings", "drawerItemStyle": { "display": "flex" } }} />
                <Drawer.Screen name = "screens/report-feedback/report-feedback" component = {ReportFeedback} options = {{ "drawerLabel": "Report Feedback", "title": "Report Feedback", "drawerItemStyle": { "display": "flex" } }} />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}
