import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "react-native-compressor";

const UploadVideo = (videoFileName) => {
    const [video, setVideo] = useState(null);
    const downloadVideo = async (videoUri) => {
        if (!videoUri) {
            console.error("Video URI is null. Please select a valid video.");
            return;
        }

        const destinationUri = `${FileSystem.documentDirectory}${videoFileName}`;
        
        const compressedVideo = await Video.compress(videoUri, {}, (progress) => { console.log("Compression Progress: ", progress); });

        try {
            await FileSystem.copyAsync({ "from": compressedVideo, "to": destinationUri });
            console.log("Video downloaded successfully!");
            console.log(destinationUri);
        } catch (error) {
            console.error("Error downloading video:", error);
        }
    };
    
    const pickVideo = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            "type": "video/*",
            "copyToCacheDirectory": true,
        });
        
        const uri = result.assets[0].uri;

        if (result.assets[0].uri) {
            setVideo(result);
            downloadVideo(uri);
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
