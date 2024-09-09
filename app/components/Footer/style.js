import { StyleSheet } from "react-native";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const styles = StyleSheet.create({
    "container": {
        "flex": 1,
        "backgroundColor": colours.red,
        "color": colours.black,
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-evenly",
        "position": "absolute",
        "bottom": 0,
        "width": "100%",
        "height": "auto",
        "paddingBottom": "1%",
        "paddingTop": "1%",
        "flexDirection": "row",
    },
});

export { styles };
