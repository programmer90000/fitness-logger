import { React } from "react";
import renderer from "react-test-renderer";
import App from "../app/index";

test("index.js Test", () => {
    const snapshot = renderer.create(<App />);
    let snapshotJSON = snapshot.toJSON();
    expect(snapshotJSON).toMatchSnapshot();
});
