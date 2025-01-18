import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { colours } from "../../constants/colours.js";

const FAQComponent = ({ faqData, style }) => {
    const [collapsed, setCollapsed] = useState(faqData.map(() => { return true; }));

    const toggleExpanded = (index) => {
        setCollapsed((prevState) =>
        { return prevState.map((state, i) => { return (i === index ? !state : state); }); },
        );
    };

    const styles = StyleSheet.create({
        "header": { "backgroundColor": colours.main_background },
    });

    return (
        <View className = {`p-2.5 ${style}`}>
            {faqData.map((item, index) => { return (
                <View key = {index}>
                    <TouchableOpacity onPress = {() => { return toggleExpanded(index); }} style = {styles.header} className = "p-[15px] border-[1px]" >
                        <Text className = "font-bold">{item.title}</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed = {collapsed[index]}>
                        <View className = "p-2.5">
                            <Text>{item.content}</Text>
                        </View>
                    </Collapsible>
                </View>
            ); })}
        </View>
    );
};

export default FAQComponent;
