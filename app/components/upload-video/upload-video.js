import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Video, Image } from "react-native-compressor";

const UploadVideo = ({ onMediaSelect, mediaFileName, mediaType }) => {
    const [media, setMedia] = useState(null);
    
    const getUniqueFileName = async (mediaFileName) => {
        let formattedName = mediaFileName.replace(/\s+/g, "-");
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

    const downloadMedia = async (mediaUri, fileName) => {
        if (!mediaUri) {
            console.error("Media URI is null. Please select a valid video.");
            return;
        }

        const mediaFileName = fileName.split("/").pop();
        const uniqueFileName = await getUniqueFileName(mediaFileName);
        const destinationUri = `${FileSystem.documentDirectory}${uniqueFileName}`;
        onMediaSelect(destinationUri);
        let compressedMedia;
        if (mediaType === "Video") {
            compressedMedia = await Video.compress(mediaUri, {}, (progress) => { console.log("Compression Progress: ", progress); });
        } else if (mediaType === "Image") {
            compressedMedia = await Image.compress(mediaUri, {}, (progress) => { console.log("Compression Progress: ", progress); });
        }
        try {
            await FileSystem.copyAsync({ "from": compressedMedia, "to": destinationUri });
            console.log("Media downloaded successfully!");
            console.log(destinationUri);
        } catch (error) {
            console.error("Error downloading video:", error);
        }
    };
    
    const handleVideoDownload = (videoPath) => {
        setVideoPath(videoPath);
    };
    
    const pickMedia = async () => {
        let typeOfMedia;
        if (mediaType === "Video") {
            typeOfMedia = "video/*";
        } else if (mediaType === "Image") {
            typeOfMedia = "image/*";
        } else {
            throw new Error("Invalid media type");
        }
        let result = await DocumentPicker.getDocumentAsync({
            "type": typeOfMedia,
            "copyToCacheDirectory": true,
        });
        
        if (result.assets && result.assets[0]?.uri) {
            const uri = result.assets[0].uri;
            setMedia(result);
            downloadMedia(uri, result.assets[0].name);
        }
    };

    return (
        <View className = "flex-1 justify-center items-center">
            <TouchableOpacity style = {{ "backgroundColor": "#FF0000" }} className = "p-2 mt-[5px]" onPress = {pickMedia}>
                <Text className = "font-medium text-base">Upload {mediaType}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadVideo;
