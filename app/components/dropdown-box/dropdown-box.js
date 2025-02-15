import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const styles = StyleSheet.create({
    "container": {
        "padding": 16,
    },
    "dropdown": {
        "height": 50,
        "borderColor": "gray",
        "borderWidth": 1,
        "borderRadius": 8,
        "paddingHorizontal": 8,
        "width": 200,
    },
    "disabled": {
        "opacity": 0.5,
        "backgroundColor": "#e0e0e0",
    },
});

const DropdownComponent = ({ data, value, onChange, style, placeholderStyle, selectedTextStyle, placeholder = "Select an option", disabled = false, 
}) => {
    return (
        <View style = {styles.container}>
            <Dropdown
                style = {[ styles.dropdown, style, disabled && styles.disabled ]}
                data = {data}
                labelField = "label"
                valueField = "value"
                placeholder = {placeholder}
                value = {value}
                onChange = {(item) => {
                    onChange(item.value);
                }}
                placeholderStyle = {placeholderStyle}
                selectedTextStyle = {selectedTextStyle}
                disable = {disabled}
            />
        </View>
    );
};

export default DropdownComponent;
