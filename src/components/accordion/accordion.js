import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { colours } from "../../constants/colours.js";

const Accordion = ({ faqData, style }) => {
    const [collapsed, setCollapsed] = useState(faqData.map(() => { return true; }));

    const toggleExpanded = (index) => {
        setCollapsed((prevState) => {
            return prevState.map((state, i) => {
                return (i === index ? !state : state);
            });
        });
    };

    return (
        <View className = {`p-2.5 w-96 ${style}`}>
            {faqData.map((item, index) => { return (
                <View key = {index}>
                    <TouchableOpacity onPress = {() => { return toggleExpanded(index); }} style = {{ "backgroundColor": colours.main_background }} className = "p-[15px] border border-solid border-black">
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

export default Accordion;
