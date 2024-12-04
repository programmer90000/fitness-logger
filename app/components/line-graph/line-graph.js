import React from "react";
import { colours } from "../../constants/colours.js";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const LineChartComponent = () => {
    const data = {
        "labels": ["January", "February", "March", "April", "May", "June", "July"],
        "datasets": [
            {
                "data": [20, 45, 28, 80, 99, 43, 50],
                "color": (opacity = 1) => { return `rgba(255, 0, 0, ${opacity})`; }, // Line color
                "strokeWidth": 2, // Line thickness
            },
        ],
    };

    const chartConfig = {
        "backgroundColor": colours.colour_9,
        "backgroundGradientFrom": colours.colour_10,
        "backgroundGradientTo": colours.colour_11,
        "decimalPlaces": 2, // Optional, defaults to 2 decimal places
        "color": (opacity = 1) => { return `rgba(255, 255, 255, ${opacity})`; }, // Axis text color
        "labelColor": (opacity = 1) => { return `rgba(255, 255, 255, ${opacity})`; }, // Label color
        "style": {
            "borderRadius": 16,
        },
        "propsForDots": {
            "r": "6",
            "strokeWidth": "2",
            "stroke": colours.colour_11, // Dot stroke color
        },
    };

    const screenWidth = Dimensions.get("window").width;

    return (
        <View style = {{ "flex": 1, "justifyContent": "center", "alignItems": "center" }}>
            <LineChart
                data = {data}
                width = {screenWidth * 0.9} // Use 90% of the screen width for the chart
                height = {220}
                chartConfig = {chartConfig}
                bezier
                fromZero
                style = {{
                    "marginVertical": 8,
                    "borderRadius": 16,
                }}
            />
        </View>
    );
};

export default LineChartComponent;
