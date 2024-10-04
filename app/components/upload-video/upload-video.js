import React, { useState } from "react";
import { View, Button } from "react-native";
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
        <View style = {{ "flex": 1, "justifyContent": "center", "alignItems": "center" }}>
            <Button title = "Upload Video" onPress = {pickVideo} />
        </View>
    );
};

export default UploadVideo;
