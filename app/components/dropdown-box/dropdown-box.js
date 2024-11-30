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
});

const DropdownComponent = ({ data, value, onChange, style, placeholder = "Select an option" }) => {
    return (
        <View style = {styles.container}>
            <Dropdown
                style = {[styles.dropdown, style]}
                data = {data}
                labelField = "label"
                valueField = "value"
                placeholder = {placeholder}
                value = {value}
                onChange = {(item) => {
                    onChange(item.value);
                }}
            />
        </View>
    );
};

export default DropdownComponent;
