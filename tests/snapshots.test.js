import { React } from "react";
import renderer from "react-test-renderer";
import App from "../app/index";
import Badges from "../app/screens/badges/badges";
import CreateANewWorkoutPreset from "../app/screens/create-a-new-workout-preset/create-a-new-workout-preset";
import CreateWorkout from "../app/screens/create-workout/create-workout.js";
import LogWorkout from "../app/screens/log-workout/log-workout.js";
import SetGoal from "../app/screens/set-goal/set-goal.js";
import UploadDownloadData from "../app/screens/upload-download-data/upload-download-data.js";

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

test("upload-download-data.js Test", () => {
    const snapshot = renderer.create(<UploadDownloadData />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});
