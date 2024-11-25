import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "react-native-compressor";

const UploadVideo = ({ onVideoSelect, videoFileName }) => {
    const [video, setVideo] = useState(null);
    
    const getUniqueFileName = async (videoFileName) => {
        let formattedName = videoFileName.replace(/\s+/g, "-");
        let fileName = formattedName;
        let counter = 1;
    
        while (true) {
            const filePath = `${FileSystem.documentDirectory}${fileName}`;
            const fileExists = await FileSystem.getInfoAsync(filePath);
        
            if (!fileExists.exists) {
                return fileName;
            }
        
            const nameWithoutExt = formattedName.replace(/\.[^/.]+$/, "");
            const extension = formattedName.split(".").pop();
            fileName = `${nameWithoutExt}-${counter}.${extension}`;
            counter++;
        }
    };

    const downloadVideo = async (videoUri, fileName) => {
        if (!videoUri) {
            console.error("Video URI is null. Please select a valid video.");
            return;
        }

        const videoFileName = fileName.split("/").pop();
        const uniqueFileName = await getUniqueFileName(videoFileName);
        const destinationUri = `${FileSystem.documentDirectory}${uniqueFileName}`;
        onVideoSelect(destinationUri);
        
        const compressedVideo = await Video.compress(videoUri, {}, (progress) => { console.log("Compression Progress: ", progress); });

        try {
            await FileSystem.copyAsync({ "from": compressedVideo, "to": destinationUri });
            console.log("Video downloaded successfully!");
            console.log(destinationUri);
        } catch (error) {
            console.error("Error downloading video:", error);
        }
    };
    
    const handleVideoDownload = (videoPath) => {
        setVideoPath(videoPath);
    };
    
    const pickVideo = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            "type": "video/*",
            "copyToCacheDirectory": true,
        });
        
        if (result.assets && result.assets[0]?.uri) {
            const uri = result.assets[0].uri;
            setVideo(result);
            downloadVideo(uri, result.assets[0].name);
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
