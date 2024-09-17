import { StyleSheet } from "react-native";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const styles = StyleSheet.create({
    "screen": {
        "backgroundColor": colours.white,
    },
    "container": {
        "margin": 5,
        "alignItems": "center",
    },
    "title": {
        "fontSize": 20,
        "color": colours.black,
    },
    "textInput": {
        "backgroundColor": "#DEDEDE",
        "width": "90%",
        "margin": 10,
        "marginLeft": 10,
        "verticalAlign": "middle",
        "flex": 1,
        "textAlign": "center",
    },
    "mainExerciseTitle": {
        "marginTop": 30,
    },
    "exerciseTitle": {
        "fontSize": 15,
        "flex": 1,
    },
    "formFields": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
    },
    "exerciseFormFields": {
        "flexDirection": "row",
        "width": "100%",
    },
    "exerciseField": {
        "backgroundColor": "#f0f0f0",
        "padding": "20px",
        "margin": "10px",
        "border": "1px solid #ccc",
        "flex": 1,
        "minHeight": "100px",
        "alignItems": "center",
    },
    "newExercise": {
        "display": "flex",
        "flexDirection": "column",
        "width": "100%",
        "justifyContent": "space-between",
        "marginTop": 15,
        "flexWrap": "wrap",
        "alignItems": "center",
    },
    "button": {
        "marginTop": "100px",
        "backgroundColor": "#2296f3",
        "padding": 8,
        "margin": 5,
    },
    "buttonText": {
        "color": colours.white,
        "fontSize": 16,
        "fontWeight": "bold",
    },
});

export { styles };
