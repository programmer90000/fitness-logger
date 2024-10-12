import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const UploadVideo = () => {
    const [video, setVideo] = useState(null);

    const pickVideo = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            "type": "video/*",
            "copyToCacheDirectory": true,
        });

        if (result.type === "success") {
            setVideo(result);
            console.log(result);
        }
    };

    return (
        <View className = "flex-1 justify-center items-center">
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[5px]" onPress = {pickVideo}>
                <Text className = "font-medium text-base">Upload Video</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadVideo;
