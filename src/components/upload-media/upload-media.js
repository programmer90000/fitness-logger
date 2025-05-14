import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { Video, Image } from "react-native-compressor";
import { colours } from "../../constants/colours.js";

const UploadMedia = ({ onMediaSelect, mediaFileName, mediaType }) => {
    const [media, setMedia] = useState(null);

    const getUniqueFileName = async (originalName) => {
        let formattedName = originalName.replace(/\s+/g, "-");
        let fileName = formattedName;
        let counter = 1;

        const directoryPath = RNFS.DocumentDirectoryPath;

        while (true) {
            const filePath = `${directoryPath}/${fileName}`;
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

    const downloadMedia = async (mediaUri, originalName) => {
        if (!mediaUri) {
            console.error(`Media URI is null. Please select a valid ${mediaType}.`);
            return;
        }

        const uniqueFileName = await getUniqueFileName(originalName);
        const destinationUri = `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`;
        onMediaSelect(destinationUri);

        let compressedMedia;
        try {
            if (mediaType === "Video") {
                compressedMedia = await Video.compress(mediaUri, {}, () => {});
            } else if (mediaType === "Image") {
                compressedMedia = await Image.compress(mediaUri, {}, () => {});
            } else {
                throw new Error("Unsupported media type");
            }

            await RNFS.copyFile(compressedMedia, destinationUri);
        } catch (error) {
            console.error(`Error downloading ${mediaType}:`, error);
        }
    };

    const pickMedia = async () => {
        let typeOfMedia;
        if (mediaType === "Video") {
            typeOfMedia = [DocumentPicker.types.video];
        } else if (mediaType === "Image") {
            typeOfMedia = [DocumentPicker.types.images];
        } else {
            throw new Error("Invalid media type");
        }

        try {
            const result = await DocumentPicker.pickSingle({
                type: typeOfMedia,
                copyTo: "cachesDirectory",
            });

            if (result?.uri) {
                setMedia(result);
                await downloadMedia(result.uri, result.name);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User canceled picker");
            } else {
                console.error("DocumentPicker error:", err);
            }
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
