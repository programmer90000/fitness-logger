import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { colours } from "../../constants/colours.js";

const FAQComponent = ({ faqData }) => {
    const [collapsed, setCollapsed] = useState(faqData.map(() => { return true; }));

    const toggleExpanded = (index) => {
        setCollapsed((prevState) =>
        { return prevState.map((state, i) => { return (i === index ? !state : state); }); },
        );
    };

    const styles = StyleSheet.create({
        "container": { "padding": 10 },
        "header": { "backgroundColor": colours.main_background, "padding": 15, "borderWidth": 1 },
        "headerText": { "fontWeight": "bold" },
        "content": { "padding": 10 },
    });

    return (
        <View style = {styles.container}>
            {faqData.map((item, index) => { return (
                <View key = {index}>
                    <TouchableOpacity onPress = {() => { return toggleExpanded(index); }} style = {styles.header} >
                        <Text style = {styles.headerText}>{item.title}</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed = {collapsed[index]}>
                        <View style = {styles.content}>
                            <Text>{item.content}</Text>
                        </View>
                    </Collapsible>
                </View>
            ); })}
        </View>
    );
};

export default FAQComponent;
