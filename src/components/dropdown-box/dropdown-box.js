import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownBox = ({ data, value, onChange, style, placeholderStyle, selectedTextStyle, placeholder = "Select an option", disabled = false, 
}) => {
    return (
        <View className = "p-4">
            <Dropdown style = { style } containerStyle = "rounded-lg" data = {data} labelField = "label" valueField = "value" placeholder = {placeholder} value = {value} onChange = {(item) => { return onChange(item.value); }} placeholderStyle = {placeholderStyle} selectedTextStyle = {selectedTextStyle} disable = {disabled} className = {`h-12 border border-gray-400 rounded-lg px-2 w-[200px] ${disabled ? "bg-gray-300 opacity-50" : ""}`}/>
        </View>
    );
};

export default DropdownBox;
