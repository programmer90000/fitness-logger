import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineChartComponent = ({ labels, dataPoints, lineColor, backgroundGradientFrom, backgroundGradientTo, labelColor, dotColor, decimalPlaces = 2 }) => {
    const data = {
        labels,
        "datasets": [
            {
                "data": dataPoints,
                "color": (opacity = 1) => { return lineColor.replace("1)", `${opacity})`); },
                "strokeWidth": 2,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom,
        backgroundGradientTo,
        decimalPlaces,
        "color": (opacity = 1) => { return labelColor.replace("1)", `${opacity})`); },
        "labelColor": (opacity = 1) => { return labelColor.replace("1)", `${opacity})`); },
        "style": { "borderRadius": 16 },
        "propsForDots": {
            "r": "6",
            "strokeWidth": "2",
            "stroke": dotColor,
        },
    };

    const screenWidth = Dimensions.get("window").width;

    return (
        <View style = {{ "justifyContent": "center", "alignItems": "center" }}>
            <LineChart data = {data} width = {screenWidth * 0.9} height = {220} chartConfig = {chartConfig} bezier fromZero style = {{ "marginVertical": 8, "borderRadius": 16 }} />
        </View>
    );
};

export { LineChartComponent };
