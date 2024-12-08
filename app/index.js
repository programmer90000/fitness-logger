import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style.js";

import Footer from "./components/Footer/Footer.js";

export default function App() {
    return (
        <View style = {styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style = "auto" />
            <Footer />
        </View>
    );
}
