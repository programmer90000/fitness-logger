import { React } from "react";
import App from "../app/index";
import renderer from "react-test-renderer";

test("index.js Test", () => {
    const snapshot = renderer.create(<App />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});
