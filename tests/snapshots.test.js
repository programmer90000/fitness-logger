import { React } from "react";
import renderer from "react-test-renderer";
import App from "../app/index";
import Badges from "../app/screens/badges/badges";
import CreateANewWorkoutPreset from "../app/screens/create-a-new-workout-preset/create-a-new-workout-preset";
import CreateExercise from "../app/screens/create-exercise/create-exercise.js";
import CreateWorkout from "../app/screens/create-workout/create-workout.js";
import LogWorkout from "../app/screens/log-workout/log-workout.js";
import SetGoal from "../app/screens/set-goal/set-goal.js";
import Settings from "../app/screens/settings/settings.js";
import Statistics from "../app/screens/statistics/statistics.js";
import UploadDownloadData from "../app/screens/upload-download-data/upload-download-data.js";
import ViewGoals from "../app/screens/view-goals/view-goals.js";
import WorkoutHistory from "../app/screens/workout-history/workout-history.js";
import { useTheme } from "../app/hooks/useTheme.js";

jest.mock("@react-native-async-storage/async-storage", () => {
    return {
        "getItem": jest.fn(() => { return Promise.resolve(null); }),
        "setItem": jest.fn(() => { return Promise.resolve(); }),
        "removeItem": jest.fn(() => { return Promise.resolve(); }),
        "clear": jest.fn(() => { return Promise.resolve(); }),
        "getAllKeys": jest.fn(() => { return Promise.resolve([]); }),
        "multiGet": jest.fn(() => { return Promise.resolve([]); }),
        "multiSet": jest.fn(() => { return Promise.resolve(); }),
        "multiRemove": jest.fn(() => { return Promise.resolve(); }),
    };
});


// Set a fixed date and time when running the tests
const fixedDate = new Date("2024-10-21T00:00:00Z");
beforeAll(() => {
    global.Date = class extends Date {
        constructor() {
            super();
            return fixedDate;
        }
    };
});

afterAll(() => {
    global.Date = Date;
});

beforeEach(() => {
    useTheme.mockReturnValue({
        "isReady": true,
        "colours": {
            "colour_1": "#FFFFFF", // White
            "colour_2": "#F1F1F1", // Very Light Grey
            "colour_3": "#000000", // Black
            "colour_4": "#060606", // Dark Grey
            "colour_5": "#DEDEDE", // Light Grey
            "colour_6": "#F0F0F0", // Very Light Grey
            "colour_7": "#FF0000", // Red
            "colour_8": "#D10000", // Strong Red
            "colour_9": "#E26A00", // Dark Orange
            "colour_10": "#FB8C00", // Orange
            "colour_11": "#FFA726", // Vivid Orange
            "colour_12": "#2296F3", // Vivid Blue
            "colour_13": "#F1F8FF", // Very Light Blue
            "colour_14": "#F6F8FA", // Grayish Blue
            "colour_15": "#FFD700", // Yellow
        },
    });
});

jest.mock("../app/hooks/useTheme.js", () => { return {
    "useTheme": jest.fn(),
}; });

test("index.js Test", () => {
    const snapshot = renderer.create(<App />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("badges.js Test", () => {
    const snapshot = renderer.create(<Badges />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("create-a-new-workout-preset.js Test", () => {
    const snapshot = renderer.create(<CreateANewWorkoutPreset />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("create-exercise.js", () => {
    const snapshot = renderer.create(<CreateExercise />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("create-workout.js Test", () => {
    const snapshot = renderer.create(<CreateWorkout />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("log-workout.js Test", () => {
    const snapshot = renderer.create(<LogWorkout />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("set-goal.js Test", () => {
    const snapshot = renderer.create(<SetGoal />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("settings.js Test", () => {
    const snapshot = renderer.create(<Settings />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("statistics.js Test", () => {
    const snapshot = renderer.create(<Statistics />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("upload-download-data.js Test", () => {
    const snapshot = renderer.create(<UploadDownloadData />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("view-goals.js Test", () => {
    const snapshot = renderer.create(<ViewGoals />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});

test("workout-history.js Test", () => {
    const snapshot = renderer.create(<WorkoutHistory />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});
