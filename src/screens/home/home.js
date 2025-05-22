import React, { useEffect} from "react";
import { ScrollView, StatusBar, Text, useColorScheme } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import BootSplash from "react-native-bootsplash";

function Home() {

    useEffect(() => {
        const init = async () => {
            await new Promise((resolve) => { return setTimeout(resolve, 1000); });
    
            await BootSplash.hide({ "fade": true });
            console.log("BootSplash has been hidden successfully");
        };
    
        init();
    }, []);
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = { "backgroundColor": isDarkMode ? Colors.darker : Colors.lighter };

    return (
        <ScrollView style={backgroundStyle}>
            <StatusBar barStyle = {isDarkMode ? "light-content" : "dark-content"} backgroundColor = {backgroundStyle.backgroundColor} />
            <Text>Temp</Text>
        </ScrollView>
    );
}

export default Home;
