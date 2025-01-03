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
import ReportFeedback from "../app/screens/report-feedback/report-feedback.js";
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
const OriginalDate = global.Date;

beforeAll(() => {
    global.Date = class extends Date {
        constructor() {
            super();
            return fixedDate;
        }
    };
});

afterAll(() => {
    global.Date = OriginalDate;
});

beforeEach(() => {
    useTheme.mockReturnValue({
        "isReady": true,
        "colours": {
            "main_background": "#F1F1F1",
            "button_background_1": "#FF0000",
            "button_background_2": "#F1F1F1",
            "button_text_1": "#060606",
            "text_1": "#060606",
            "input_field_background_1": "#DEDEDE",
            "badge_completed": "#FFD700",
            "badge_uncompleted": "#000000",
            "footer_background": "#D10000",
            "footer_images": "#060606",
            "statistics_title": "#F6F8FA",
            "statistics_head": "#F1F8FF",
            "heading_colour_1": "#000000",
            "heading_colour_2": "#060606",
        },
    });
});

jest.mock("../app/hooks/useTheme.js", () => { return {
    "useTheme": jest.fn(),
}; });

afterEach(() => {
    jest.clearAllMocks();
});

test("index.js Test", async () => {
    const snapshot = renderer.create(<App />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("badges.js Test", async () => {
    const snapshot = renderer.create(<Badges />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("create-a-new-workout-preset.js Test", async () => {
    const snapshot = renderer.create(<CreateANewWorkoutPreset />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("create-exercise.js", async () => {
    const snapshot = renderer.create(<CreateExercise />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("create-workout.js Test", async () => {
    const snapshot = renderer.create(<CreateWorkout />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("log-workout.js Test", async () => {
    const snapshot = renderer.create(<LogWorkout />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("set-goal.js Test", async () => {
    const snapshot = renderer.create(<SetGoal />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("settings.js Test", async () => {
    const snapshot = renderer.create(<Settings />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("statistics.js Test", async () => {
    const snapshot = renderer.create(<Statistics />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("upload-download-data.js Test", async () => {
    const snapshot = renderer.create(<UploadDownloadData />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("view-goals.js Test", async () => {
    const snapshot = renderer.create(<ViewGoals />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});

test("workout-history.js Test", async () => {
    const snapshot = renderer.create(<WorkoutHistory />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();
});

test("report-feedback.js Test", async () => {
    const snapshot = renderer.create(<ReportFeedback />);
    const snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
    snapshot.unmount();

});
