import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style.js";
import Footer from "./components/Footer/Footer.js";
import { useTheme } from "./hooks/useTheme.js";
import * as SplashScreen from "expo-splash-screen";
import Carousel from "./components/carousel/carousel.js";
import FAQComponent from "./components/collapsible/collapsible.js"; 

SplashScreen.preventAutoHideAsync();

export default function App() {
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    const carouselData = [
        { "image": "https://imageplaceholder.net/300x200/bebebe", "text": "Slide 1" },
        { "image": "https://imageplaceholder.net/300x200/9c9c9c", "text": "Slide 2" },
        { "image": "https://imageplaceholder.net/300x200/716f6f", "text": "Slide 3" },
    ];
    
    const faqData = [
        { "title": "What is React Native?", "content": "React Native is a framework for building mobile apps." },
        { "title": "How does it work?", "content": "It uses JavaScript and React to build native mobile apps." },
        { "title": "Is it easy to learn?", "content": "Yes, especially if you know JavaScript and React." },
    ];

    return (
        <View style = {[styles.container, { "backgroundColor": colours.main_background }]}> 
            <Carousel data = {carouselData} />
            <FAQComponent faqData = {faqData} />
            <StatusBar style = "auto" />
            <Footer />
        </View>
    );
}
