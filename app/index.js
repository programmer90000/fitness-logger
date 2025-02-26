import React, { useEffect } from "react";
import { Text, ScrollView, StatusBar } from "react-native";
import { registerRootComponent } from "expo";
import { styles } from "./style.js";
import Footer from "./components/Footer/Footer.js";
import { useTheme } from "./hooks/useTheme.js";
import RNBootSplash from "react-native-bootsplash";
import Carousel from "./components/carousel/carousel.js";
import FAQComponent from "./components/collapsible/collapsible.js";
import image1 from "./assets/slideshow-image-1.png";
import image2 from "./assets/slideshow-image-2.png";
import image3 from "./assets/slideshow-image-3.png";
import image4 from "./assets/slideshow-image-4.png";
import image5 from "./assets/slideshow-image-5.png";
import image6 from "./assets/slideshow-image-6.png";

export default function App() {
    const { isReady, colours } = useTheme();

    if (!isReady) {
        return null;
    }

    useEffect(() => {
        if (isReady) {
            RNBootSplash.hide();
        }
    }, [isReady]);

    const carouselData = [
        { "image": image1, "text": "Sahih Muslim 2664, Sahih" },
        { "image": image2, "text": "Surat Al-Baqarah 2:195" },
        { "image": image3, "text": "Surah Al-Araf 7:31" },
        { "image": image4, "text": "Surah Al-Anfal 8:60" },
        { "image": image5, "text": "Surah An-Najm 53:39" },
        { "image": image6, "text": "Sunan Abi Dawood 4078, Sahih" },
    ];
    
    const faqData = [
        { "title": "What is React Native?", "content": "React Native is a framework for building mobile apps." },
        { "title": "How does it work?", "content": "It uses JavaScript and React to build native mobile apps." },
        { "title": "Is it easy to learn?", "content": "Yes, especially if you know JavaScript and React." },
    ];

    const benefitsOfUsingFitnessLogger = [
        { "title": "Enhanced Awareness of Activity Levels", "content": "This fitness tracker app help you gain a better understanding of your time spent being active. This insight can reveal gaps in your routine and help you to make healthier choices, ensuring you stay on track toward your fitness goals." },
        { "title": "Personalized Goal Setting", "content": "With this fitness tracker app, you can set realistic and achievable fitness goals tailored to your current fitness level. Whether it’s completing a number of push-ups or increasing your weekly exercise minutes, these apps guide you with measurable objectives that help you progress steadily." },
        { "title": "Building Discipline", "content": "Fitness tracker apps promote discipline by encouraging consistent effort over time. Progress charts keep you accountable, helping you establish a routine. Over time, this consistency strengthens your willpower and instills a habit of prioritizing physical activity." },
        { "title": "Health Insights", "content": "Fitness trackers store your health data over time, providing valuable insights into trends in your fitness level. These records can be shared with healthcare providers to support better-informed medical decisions." },
        { "title": "Progress Visualization", "content": "The visual representation of your progress—graphs, charts, and milestones—can be a powerful motivator. Seeing how far you’ve come reinforces positive behavior and encourages you to keep pushing toward your fitness goals.Improving fitness through a fitness tracker app is not just about physical health; it’s about building habits, enhancing awareness, and creating a sustainable lifestyle change." },

    ];

    return (
        <ScrollView style = {[styles.container, { "backgroundColor": colours.main_background }]} contentContainerStyle = {{ "alignItems": "center" }} > 
            <Carousel data = {carouselData} style = "mt-3" />
            <Text className = "mt-10 text-2xl">Why use a fitness logger app?</Text>
            <Text className = "m-3">Using a fitness logger app is a powerful way to take control of your health and fitness journey. It helps you monitor your progress, set achievable goals, and stay accountable by providing a clear picture of your workouts. By tracking your efforts, you can identify trends and make informed adjustments to your routine, ensuring you continue improving your fitness. Whether you're striving to lose weight, build strength, or simply maintain a healthy lifestyle, a fitness logger app makes it easier to turn your goals into lasting habits.</Text>
            <Text className = "mt-5 text-2xl">FAQ</Text>
            <FAQComponent faqData = {faqData} style = "mt-3" />
            <Text className = "mt-5 text-2xl">Benefits Of Using A Fitness Logger</Text>
            <FAQComponent faqData = {benefitsOfUsingFitnessLogger} style = "mb-10" />
            <StatusBar barStyle = "light-content" backgroundColor = {colours.button_background_1} />
        </ScrollView>
    );
}
registerRootComponent(App);

