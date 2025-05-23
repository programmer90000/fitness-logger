import React, { useEffect } from "react";
import { ScrollView, Text, StatusBar } from "react-native";
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
    return (
        <ScrollView>
            <StatusBar barStyle = "light-content" backgroundColor = "#ff0000" />
            <Text>Temp</Text>
        </ScrollView>
    );
}

export default Home;
