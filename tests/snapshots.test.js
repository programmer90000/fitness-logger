import { React } from "react";
import renderer, { act } from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
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
import { useTheme } from "../app/hooks/useTheme.js";
import { workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises, goals, badges } from "../database/realm-database.js";

jest.mock("realm", () => {
    const mockRealm = {
        "objects": jest.fn(() => {
            const results = [];
            results.filtered = jest.fn(() => { return results; });
            results.map = jest.fn(() => { return []; });
            return results;
        }),
        "write": jest.fn((callback) => { return callback(); }),
        "create": jest.fn(),
        "deleteAll": jest.fn(),
        "close": jest.fn(),
        "addListener": jest.fn(),
        "removeListener": jest.fn(),
    };

    mockRealm.open = jest.fn().mockResolvedValue(mockRealm);
    mockRealm.schema = [
        {
            "name": "WorkoutPresets",
            "properties": {
                "id": "int",
                "name": "string",
                "notes": "string",
            },
            "primaryKey": "id",
        },
        {
            "name": "Exercises",
            "properties": {
                "id": "int",
                "name": "string",
                "type": "string",
                "notes": "string",
                "video": "string",
                "personalBest": "string",
                "isDeleted": { "type": "bool", "default": false },
            },
            "primaryKey": "id",
        },
        {
            "name": "WorkoutPresetsExercises",
            "properties": {
                "id": "int",
                "workoutPresets": "WorkoutPresets",
                "exercises": "Exercises",
                "metrics": "string",
                "volume": "string",
            },
            "primaryKey": "id",
        },
        {
            "name": "PreviousWorkouts",
            "properties": {
                "id": "int",
                "name": "string",
                "notes": "string",
                "date": "date",
            },
            "primaryKey": "id",
        },
        {
            "name": "PreviousWorkoutsExercises",
            "properties": {
                "id": "int",
                "previousWorkouts": "PreviousWorkouts",
                "exercises": "Exercises",
                "metrics": "string", 
                "volume": "string",
            },
            "primaryKey": "id",
        },
        {
            "name": "Goals",
            "properties": {
                "id": "int",
                "name": "string",
                "type": "string",
                "value": "string",
                "startDate": "date",
                "endDate": "date",
                "reminders": "date",
                "notes": "string",
            },
            "primaryKey": "id",
        },
        {
            "name": "Badges",
            "properties": {
                "id": "int",
                "image": "string",
                "text": "string",
                "completed": "bool",
            },
            "primaryKey": "id",
        },
    ];
    mockRealm.deleteRealmIfMigrationNeeded = true;

    return jest.fn(() => { return mockRealm; });
});

jest.mock("react-native-bootsplash", () => {
    return {
        "hide": jest.fn().mockResolvedValue(),
        "show": jest.fn().mockResolvedValue(),
        "getVisibilityStatus": jest.fn().mockResolvedValue(),
    };
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("react-native/Libraries/Utilities/Platform", () => { return {
    "OS": "android",
    "select": jest.fn((obj) => { return obj.android; }),
}; });

// Mock Expo modules
jest.mock("expo", () => { return {
    "registerRootComponent": jest.fn(),
}; });

jest.mock("expo-modules-core", () => { return {
    "NativeModulesProxy": {},
    "NativeModule": {},
    "requireOptionalNativeModule": jest.fn(),
}; });

jest.mock("expo-file-system", () => { return {
    "documentDirectory": "file:///mock/path/",
    "readAsStringAsync": jest.fn(),
    "writeAsStringAsync": jest.fn(),
    "deleteAsync": jest.fn(),
    "getInfoAsync": jest.fn(),
    "downloadAsync": jest.fn(),
}; });

jest.mock("react-native-fs");

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
