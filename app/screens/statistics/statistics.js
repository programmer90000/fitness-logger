import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme.js";
import { colours } from "../../constants/colours";
import Realm from "realm";
import { exercises, previousWorkouts, previousWorkoutsExercises } from "../../../database/realm-database.js";
import { LineChartComponent } from "../../components/line-graph/line-graph";

const Statistics = () => {
    const { isReady, colours } = useTheme();
    const [numberOfWorkouts, setNumberOfWorkouts] = useState();
    const [numberOfExercises, setNumberOfExercises] = useState();
    const [numberOfRepsExercises, setNumberOfRepsExercises] = useState();
    const [numberOfWeightAndRepsExercises, setNumberOfWeightAndRepsExercises] = useState();
    const [numberOfDistanceAndTimeExercises, setNumberOfDistanceAndTimeExercises] = useState();
    const [averageNumberOfExercisesPerWorkout, setAverageNumberOfExercisesPerWorkout] = useState();

    useEffect(() => {
        const realm = new Realm({ "schema": [previousWorkouts, exercises, previousWorkoutsExercises] });
        setNumberOfWorkouts(realm.objects("PreviousWorkouts").length);
        setNumberOfExercises(realm.objects("PreviousWorkoutsExercises").length);
        setNumberOfRepsExercises(realm.objects("PreviousWorkoutsExercises").filtered("exercises.type == $0", "reps").length);
        setNumberOfWeightAndRepsExercises(realm.objects("PreviousWorkoutsExercises").filtered("exercises.type == $0", "weightAndReps").length);
        setNumberOfDistanceAndTimeExercises(realm.objects("PreviousWorkoutsExercises").filtered("exercises.type == $0", "distanceAndTime").length);
        let totalExercises = 0;
        realm.objects("PreviousWorkouts").forEach((workout) => {
            const associatedExercises = realm.objects("PreviousWorkoutsExercises").filtered(`previousWorkouts.id == ${workout.id}`);
            totalExercises += associatedExercises.length;
        });
        setAverageNumberOfExercisesPerWorkout(realm.objects("PreviousWorkouts").length > 0 ? totalExercises / realm.objects("PreviousWorkouts").length : 0);
        const previousWorkoutsExercisesArray = realm.objects("PreviousWorkoutsExercises");
        previousWorkoutsExercisesArray.forEach((previousWorkout) => {
            const volumeMultipliedByMetrics = previousWorkout.volume * previousWorkout.metrics;
            console.log(volumeMultipliedByMetrics);
        });
        realm.close();
    }, []);
    
    if (!isReady) {
        return null;
    }
    
    styles = StyleSheet.create({
        "container": { "flex": 1, "padding": 16, "paddingTop": 30, "backgroundColor": colours.main_background },
        "head": { "height": 40, "backgroundColor": colours.statistics_head },
        "wrapper": { "flexDirection": "row" },
        "title": { "flex": 1, "backgroundColor": colours.statistics_title },
        "row": { "height": 28, "color": colours.heading_colour_1 },
        "text": { "textAlign": "center", "color": colours.heading_colour_1 },
    });

    return (
        <View style = {styles.container}>
            <Text>Number of workouts completed: {numberOfWorkouts}</Text>
            <Text>Number of exercises completed: {numberOfExercises}</Text>
            <Text>Number of exercises measured by Reps completed: {numberOfRepsExercises}</Text>
            <Text>Number of exercises measured by Weight and Reps completed: {numberOfWeightAndRepsExercises}</Text>
            <Text>Number of exercises measured by Distance and Time completed: {numberOfDistanceAndTimeExercises}</Text>
            <Text>Average number of exercises per workout: {averageNumberOfExercisesPerWorkout}</Text>
            <LineChartComponent
                dataPoints = {[50, 20, 2, 86, 71, 100]} 
                lineColor = "#000"
                backgroundGradientFrom = "#FF7F7F"
                backgroundGradientTo = "#DC0000"
                labelColor = "#000"
                dotColor = "#000"
                decimalPlaces = {2}
            />

        </View>
    );
};

export default Statistics;
