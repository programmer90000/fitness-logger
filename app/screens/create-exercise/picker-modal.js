import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import { colours } from "../../constants/colours.js";

const PickerModal = ({ options, onValueChange, title }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelect = (item) => {
        const newSelectedValues = selectedValues.includes(item) ? selectedValues.filter((i) => { return i !== item; }) : [...selectedValues, item];
        onValueChange(newSelectedValues);
        setSelectedValues(newSelectedValues);
    };


    const closeModal = () => { return setIsVisible(false); };

    return (
        <View className = "m-5">
            <TouchableOpacity className = "p-2 mt-[5px]" style = {{ "backgroundColor": colours.button_background_1 }} onPress = {() => { return setIsVisible(true); }} >
                <Text className = "font-medium text-base" style = {{ "color": colours.button_text_1 }}>Select options</Text>
            </TouchableOpacity>
            <Modal visible = {isVisible} animationType = "slide" transparent = {true} onRequestClose = {closeModal}>
                <TouchableOpacity className = "flex-1 bg-black/50 justify-center items-center" onPress = {closeModal}>
                    <View className = "w-4/5 max-h-[80%] bg-white rounded-lg p-5 items-center" onStartShouldSetResponder = {(e) => { return e.stopPropagation(); }}>
                        <Text className = "text-lg font-bold mb-5">{title || "Select Options"}</Text>

                        <FlatList data = {options} keyExtractor = {(item, index) => { return index.toString(); }} renderItem = {({ item }) => { return (
                            <TouchableOpacity className = {`p-4 border-b border-gray-300 w-full ${selectedValues.includes(item) ? "bg-gray-200" : ""}`} onPress = {() => { return handleSelect(item); }}>
                                <Text className = "text-base text-gray-800">{item}</Text>
                            </TouchableOpacity>
                        ); }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export { PickerModal };
