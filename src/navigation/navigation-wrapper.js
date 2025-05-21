import React from "react";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation.js";

enableScreens();

function NavigationWrapper() {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}

export default NavigationWrapper;
