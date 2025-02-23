import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { Video, Image } from "react-native-compressor";
import { colours } from "../../constants/colours.js";

const UploadMedia = ({ onMediaSelect, mediaFileName, mediaType }) => {
    const [media, setMedia] = useState(null);
    
    const getUniqueFileName = async (mediaFileName) => {
        let formattedName = mediaFileName.replace(/\s+/g, "-");
        let fileName = formattedName;
        let counter = 1;
        const dirPath = RNFS.DocumentDirectoryPath;
    
        while (true) {
            const filePath = `${dirPath}/${fileName}`;
            const fileExists = await RNFS.exists(filePath);
            if (!fileExists) {
                return fileName;
            }
            const nameWithoutExt = formattedName.replace(/\.[^/.]+$/, "");
            const extension = formattedName.split(".").pop();
            fileName = `${nameWithoutExt}-${counter}.${extension}`;
            counter++;
        }
    };

    const downloadMedia = async (mediaUri, fileName, mediaType, onMediaSelect, Video, Image) => {
        if (!mediaUri) {
            console.error(`Media URI is null. Please select a valid ${mediaType}.`);
            return;
        }

        const mediaFileName = fileName.split("/").pop();
        const uniqueFileName = await getUniqueFileName(mediaFileName);
        const destinationUri = `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`;
        onMediaSelect(destinationUri);
        let compressedMedia;
        if (mediaType === "Video") {
            compressedMedia = await Video.compress(mediaUri, {}, (progress) => { });
        } else if (mediaType === "Image") {
            compressedMedia = await Image.compress(mediaUri, {}, (progress) => { });
        }
        try {
            await RNFS.copyFile(compressedMedia, destinationUri);
            console.log(`${mediaType} successfully saved to:`, destinationUri);
        } catch (error) {
            console.error(`Error downloading ${mediaType}:`, error);
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
    
        try {
            const result = await DocumentPicker.pick({ "type": [typeOfMedia], "copyTo": "cachesDirectory" });
        
            if (result[0]?.fileCopyUri) {
                const uri = result[0].fileCopyUri;
                setMedia(result);
                downloadMedia(uri, result[0].name);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                return;
            }
            throw err;
        }
    };

    return (
        <View className = "flex-1 justify-center items-center mb-3">
            <TouchableOpacity style = {{ "backgroundColor": colours.button_background_1 }} className = "p-2 mt-[5px]" onPress = {pickMedia}>
                <Text className = "font-medium text-base">Upload {mediaType}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadMedia;
