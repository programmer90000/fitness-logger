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

    const benefitsOfUsingFitnessLogger = [
        { "title": "Enhanced Awareness of Activity Levels", "content": "This fitness tracker app help you gain a better understanding of your time spent being active. This insight can reveal gaps in your routine and help you to make healthier choices, ensuring you stay on track toward your fitness goals." },
        { "title": "Personalized Goal Setting", "content": "With this fitness tracker app, you can set realistic and achievable fitness goals tailored to your current fitness level. Whether it’s completing a number of push-ups or increasing your weekly exercise minutes, these apps guide you with measurable objectives that help you progress steadily." },
        { "title": "Building Discipline", "content": "Fitness tracker apps promote discipline by encouraging consistent effort over time. Progress charts keep you accountable, helping you establish a routine. Over time, this consistency strengthens your willpower and instills a habit of prioritizing physical activity." },
        { "title": "Health Insights", "content": "Fitness trackers store your health data over time, providing valuable insights into trends in your fitness level. These records can be shared with healthcare providers to support better-informed medical decisions." },
        { "title": "Progress Visualization", "content": "The visual representation of your progress—graphs, charts, and milestones—can be a powerful motivator. Seeing how far you’ve come reinforces positive behavior and encourages you to keep pushing toward your fitness goals.Improving fitness through a fitness tracker app is not just about physical health; it’s about building habits, enhancing awareness, and creating a sustainable lifestyle change." },
    ];

    return (
        <ScrollView className = "flex-1" style = {{ "backgroundColor": colours.main_background }} contentContainerStyle = {{ "alignItems": "center" }}>
            <StatusBar barStyle = "light-content" backgroundColor = "#ff0000" />
            <Text className = "mt-10 text-2xl">Why use a fitness logger app?</Text>
            <Text className = "m-3">Using a fitness logger app is a powerful way to take control of your health and fitness journey. It helps you monitor your progress, set achievable goals, and stay accountable by providing a clear picture of your workouts. By tracking your efforts, you can identify trends and make informed adjustments to your routine, ensuring you continue improving your fitness. Whether you're striving to lose weight, build strength, or simply maintain a healthy lifestyle, a fitness logger app makes it easier to turn your goals into lasting habits.</Text>
            <Text className = "mt-5 text-2xl">FAQ</Text>
            <Accordion data={faqData} style="mt-3" />
            <Text className = "mt-5 text-2xl">Benefits Of Using A Fitness Logger</Text>
            <Accordion data = {benefitsOfUsingFitnessLogger} style = "mb-10" />
        </ScrollView>
    );
}

export default Home;
