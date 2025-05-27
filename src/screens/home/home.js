import React, { useEffect } from "react";
import { ScrollView, Text, StatusBar } from "react-native";
import BootSplash from "react-native-bootsplash";
import { useTheme } from "../../hooks/use-theme.js";
import Accordion from "../../components/accordion/accordion.js";

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

const faqData = [
        { "title": "What is React Native?", "content": "React Native is a framework for building mobile apps." },
        { "title": "How does it work?", "content": "It uses JavaScript and React to build native mobile apps." },
        { "title": "Is it easy to learn?", "content": "Yes, especially if you know JavaScript and React." },
    ];

    return (
        <ScrollView className = "flex-1" style = {{ "backgroundColor": colours.main_background }} contentContainerStyle = {{ "alignItems": "center" }}>
            <StatusBar barStyle = "light-content" backgroundColor = "#ff0000" />
            <Accordion data = {faqData} style = "mt-3" />
        </ScrollView>
    );
}

export default Home;
