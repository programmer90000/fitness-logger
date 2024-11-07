import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "react-native-compressor";

const UploadVideo = (videoFileName) => {
    const [video, setVideo] = useState(null);
    
    const getUniqueFileName = async (baseFileName) => {
        let fileName = baseFileName;
        let counter = 1;
    
        while (true) {
            const filePath = `${FileSystem.documentDirectory}${fileName}`;
            const fileExists = await FileSystem.getInfoAsync(filePath);
        
            if (!fileExists.exists) {
                return fileName;
            }
        
            const nameWithoutExt = baseFileName.replace(/\.[^/.]+$/, "");
            const extension = baseFileName.split(".").pop();
            fileName = `${nameWithoutExt}${counter}.${extension}`;
            counter++;
        }
    };

    const downloadVideo = async (videoUri) => {
        if (!videoUri) {
            console.error("Video URI is null. Please select a valid video.");
            return;
        }

        const uniqueFileName = await getUniqueFileName(videoFileName);
        const destinationUri = `${FileSystem.documentDirectory}${uniqueFileName}`;
        
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
