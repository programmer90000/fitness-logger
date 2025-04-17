import React from "react";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import { registerRootComponent } from "expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "./hooks/useTheme.js";
import Footer from "./components/Footer/Footer.js";

// Importing all screens
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

const styles = StyleSheet.create({
    "container": {
        "flex": 1,
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "space-between",
    },
});

function ScreenWithFooter({ "component": Component, onLayout, ...rest }) {
    function handleLayout(event) {
        const { height } = event.nativeEvent.layout;
        console.log("Height:", height);
    }

    return (
        <View style = {{ "flex": 1 }}>
            <ScrollView contentContainerStyle = {{ "flexGrow": 1, "flexDirection": "column", "justifyContent": "space-between" }} >
                <View style = {{ "flex": 1 }} onLayout = {handleLayout}>
                    <Component {...rest} />
                </View>
                <Footer />
            </ScrollView>
        </View>
    );
}

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
                    <Drawer.Screen name = "Home" options = {{ "title": "Home", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {HomeScreen} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "CreateWorkoutPreset" options = {{ "title": "Create Workout Preset", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {CreateWorkoutPreset} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewWorkoutPreset" options = {{ "title": "View Workout Presets", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {ViewWorkoutPreset} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewIndividualWorkoutPresets" options = {{ "title": "View Individual Workout Presets", "drawerItemStyle": { "display": "none" } }}>{(props) => { return <ScreenWithFooter component = {ViewIndividualWorkoutPresets} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "CreateExercise" options = {{ "title": "Create Exercise", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {CreateExercise} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewExercises" options = {{ "title": "View Exercises", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {ViewExercises} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewIndividualExercises" options = {{ "title": "View Individual Exercises", "drawerItemStyle": { "display": "none" } }}>{(props) => { return <ScreenWithFooter component = {ViewIndividualExercises} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "CreateWorkout" options = {{ "title": "Begin Workout", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {CreateWorkout} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "RecordWorkout" options = {{ "title": "Record Workout", "drawerItemStyle": { "display": "none" } }}>{(props) => { return <ScreenWithFooter component = {RecordWorkout} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "WorkoutHistory" options = {{ "title": "Workout History", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {WorkoutHistory} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewPreviousWorkout" options = {{ "title": "View Previous Workout", "drawerItemStyle": { "display": "none" } }}>{(props) => { return <ScreenWithFooter component = {ViewPreviousWorkout} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "SetGoal" options = {{ "title": "Set Goal", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {SetGoal} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewGoals" options = {{ "title": "View Goals", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {ViewGoals} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ViewIndividualGoals" options = {{ "title": "View Individual Goals", "drawerItemStyle": { "display": "none" } }}>{(props) => { return <ScreenWithFooter component = {ViewIndividualGoals} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "BackupRestoreData" options = {{ "title": "Backup/ Restore data", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {BackupRestoreData} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "Statistics" options = {{ "title": "Statistics", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {Statistics} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "CreateBadge" options = {{ "title": "Create Badge", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {CreateBadge} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "Badges" options = {{ "title": "Badges", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {Badges} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "Calculator" options = {{ "title": "Calculator", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {Calculator} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "Settings" options = {{ "title": "Settings", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {Settings} {...props} />; }}</Drawer.Screen>
                    <Drawer.Screen name = "ReportFeedback" options = {{ "title": "Report Feedback", "drawerItemStyle": { "display": "flex" } }}>{(props) => { return <ScreenWithFooter component = {ReportFeedback} {...props} />; }}</Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

registerRootComponent(App);

