import { StyleSheet } from "react-native";

const colours = {
    "black": "#060606",
    "white": "#f1f1f1",
    "red": "#d10000",
};

const styles = StyleSheet.create({
    "container": {
        "flex": 1,
        "backgroundColor": colours.white,
        "alignItems": "center",
        "justifyContent": "center",
    },
});

export { styles };
