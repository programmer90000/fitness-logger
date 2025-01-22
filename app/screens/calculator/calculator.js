import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme.js";

const Calculator = () => {
    const [display, setDisplay] = useState("");
    const { isReady, colours } = useTheme();
    
    useEffect(() => {
        if (!isReady) {
            return;
        }
    });

    const handlePress = (value) => {
        if (value === "=") {
            try {
                setDisplay(eval(display).toString());
            } catch {
                setDisplay("Error");
            }
        } else if (value === "C") {
            setDisplay("");
        } else {
            setDisplay(display + value);
        }
    };

    return (
        <View style = {{ "backgroundColor": colours.main_background }} className = "flex-1 justify-start items-center mt-10">
            <View style = {{ "backgroundColor": colours.button_background_1 }} className = "w-11/12 p-5 rounded-xl mb-5">
                <Text className = "text-4xl text-right" style = {{ "color": colours.button_text_2 }}>{display}</Text>
            </View>
            <View className = "w-11/12">
                {[
                    ["7", "8", "9", "/"],
                    ["4", "5", "6", "*"],
                    ["1", "2", "3", "-"],
                    ["C", "0", "=", "+"],
                ].map((row, rowIndex) => { return (
                    <View className = "flex-row justify-between mb-2.5" key = {rowIndex}>
                        {row.map((buttonValue) => { return (
                            <TouchableOpacity className = "flex-1 m-1.5 p-5 rounded-xl justify-center items-center" style = {{ "backgroundColor": colours.button_background_1 }} key = {buttonValue} onPress = {() => { return handlePress(buttonValue); }} >
                                <Text className = "text-2xl" style = {{ "color": colours.button_text_2 }}>{buttonValue}</Text>
                            </TouchableOpacity>
                        ); })}
                    </View>
                ); })}
            </View>
        </View>
    );
};

export default Calculator;
