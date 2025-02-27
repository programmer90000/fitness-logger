import { React } from "react";
import renderer, { act } from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import { hooks } from "./snapshot-hooks";
import App from "../app/index";
import Badges from "../app/screens/badges/badges";
import CreateANewWorkoutPreset from "../app/screens/create-a-new-workout-preset/create-a-new-workout-preset";
import CreateExercise from "../app/screens/create-exercise/create-exercise.js";
import CreateWorkout from "../app/screens/create-workout/create-workout.js";
import LogWorkout from "../app/screens/log-workout/log-workout.js";
import SetGoal from "../app/screens/set-goal/set-goal.js";
import Settings from "../app/screens/settings/settings.js";
import Statistics from "../app/screens/statistics/statistics.js";
import BackupRestoreData from "../app/screens/backup-restore-data/backup-restore-data.js";
import ViewGoals from "../app/screens/view-goals/view-goals.js";
import WorkoutHistory from "../app/screens/workout-history/workout-history.js";
import ReportFeedback from "../app/screens/report-feedback/report-feedback.js";
import { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges } from "../database/realm-database.js";

jest.mock("realm", () => { return require("./realm-mock"); });

test("index.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(
            <NavigationContainer>
                <App />
            </NavigationContainer>,
        );
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("badges.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<Badges />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("create-a-new-workout-preset.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<CreateANewWorkoutPreset />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("create-exercise.js", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<CreateExercise />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("create-workout.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<CreateWorkout />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("log-workout.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<LogWorkout />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("set-goal.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<SetGoal />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("settings.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<Settings />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("statistics.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<Statistics />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("backup-restore-data.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<BackupRestoreData />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("view-goals.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<ViewGoals />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("workout-history.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<WorkoutHistory />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("report-feedback.js Test", async () => {
    let snapshot;

    await act(async () => {
        snapshot = renderer.create(<ReportFeedback />);
    });

    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});
