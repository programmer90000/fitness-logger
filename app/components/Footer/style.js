import { StyleSheet } from "react-native";
import { colours } from "../../constants/colours.js";

const styles = StyleSheet.create({
    "container": {
        "backgroundColor": colours.footer_background,
        "color": colours.footer_images,
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-evenly",
        "width": "100%",
        "height": "auto",
        "paddingBottom": "1%",
        "paddingTop": "1%",
        "flexDirection": "row",
    },
});

export { styles };
