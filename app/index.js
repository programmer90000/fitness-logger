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
            <Text>Why use a fitness logger app?</Text>
            <Text>Using a fitness logger app is a powerful way to take control of your health and fitness journey. It helps you monitor your progress, set achievable goals, and stay accountable by providing a clear picture of your workouts. By tracking your efforts, you can identify trends and make informed adjustments to your routine, ensuring you continue improving your fitness. Whether you're striving to lose weight, build strength, or simply maintain a healthy lifestyle, a fitness logger app makes it easier to turn your goals into lasting habits.</Text>
            <FAQComponent faqData = {faqData} />
            <StatusBar style = "auto" />
            <Footer />
        </View>
    );
}
