import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DocumentPicker, { types } from "react-native-document-picker";
import RNFS from "react-native-fs";
import { Video, Image } from "react-native-compressor";
import { colours } from "../../constants/colours.js";

const UploadMedia = ({ onMediaSelect, mediaFileName, mediaType }) => {
    const [media, setMedia] = useState(null);

    const getUniqueFileName = async (mediaFileName) => {
        let formattedName = mediaFileName.replace(/\s+/g, "-");
        let fileName = formattedName;
        let counter = 1;

        while (true) {
            const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
            const fileExists = await RNFS.exists(filePath);

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
        } catch (error) {
            console.error(`Error downloading ${mediaType}:`, error);
        }
    };

    const pickMedia = async () => {
        let typeOfMedia;
        if (mediaType === "Video") {
            typeOfMedia = [types.video];
        } else if (mediaType === "Image") {
            typeOfMedia = [types.images];
        } else {
            throw new Error("Invalid media type");
        }
        let result = await DocumentPicker.pickSingle({ "type": typeOfMedia, "mode": "import" });

        if (result?.uri) {
            const uri = result.uri;
            setMedia(result);
            downloadMedia(uri, result.assets[0].name);
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
