import { StyleSheet } from "react-native";
import { colours } from "../../constants/colours.js";

const styles = StyleSheet.create({
    "container": {
        "flex": 1,
        "backgroundColor": colours.crimson,
        "color": colours.charcoal,
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
