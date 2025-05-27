import React, { useEffect } from "react";
import { ScrollView, Text, StatusBar } from "react-native";
import BootSplash from "react-native-bootsplash";
import { useTheme } from "../../hooks/use-theme.js";

function Home() {
    const { isReady, colours } = useTheme();

    useEffect(() => {
        const init = async () => {
            await new Promise((resolve) => { return setTimeout(resolve, 1000); });
    
            await BootSplash.hide({ "fade": true });
            console.log("BootSplash has been hidden successfully");
        };
    
        init();
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <ScrollView className = "flex-1" style = {{ "backgroundColor": colours.main_background }} contentContainerStyle = {{ "alignItems": "center" }}>
            <StatusBar barStyle = "light-content" backgroundColor = "#ff0000" />
            <Text>Temp</Text>
        </ScrollView>
    );
}

export default Home;
