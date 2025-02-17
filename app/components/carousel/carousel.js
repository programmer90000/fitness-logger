import React, { useRef, useState, useEffect } from "react";
import { FlatList, View, Image, Text, Dimensions, StyleSheet } from "react-native";

const Carousel = ({ data, style, autoScroll = true, interval = 3000 }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const { width } = Dimensions.get("window");

    const handleScroll = (event) => {
        setUserHasScrolled(true);
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };


    const scrollToNext = () => {
        if (flatListRef.current && currentIndex < data.length - 1) {
            flatListRef.current.scrollToIndex({ "index": currentIndex + 1, "animated": true });
        } else if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ "index": 0, "animated": true });
        }
    };

    useEffect(() => {
        let timer;
        if (autoScroll && !userHasScrolled) {
            timer = setInterval(scrollToNext, interval);
        }
        return () => { return clearInterval(timer); };
    }, [currentIndex, autoScroll, interval, userHasScrolled]);

    const styles = StyleSheet.create({
        "carouselItem": {
            width,
            "alignItems": "center",
            "justifyContent": "flex-start",
        },
        "image": {
            "width": width * 0.9,
            "height": 200,
            "borderRadius": 10,
            "resizeMode": "cover",
        },
        "text": {
            "marginTop": 10,
            "fontSize": 16,
            "color": "#333",
        },
        "indicatorContainer": {
            "position": "absolute",
            "bottom": 10,
            "width": "100%",
            "flexDirection": "row",
            "justifyContent": "center",
            "alignItems": "center",
        },
        "indicator": {
            "width": 10,
            "height": 10,
            "borderRadius": 5,
            "marginHorizontal": 5,
        },
        "activeIndicator": {
            "backgroundColor": "#333",
        },
        "inactiveIndicator": {
            "backgroundColor": "#ccc",
        },
    });

    return (
        <View className = {`h-[300px] ${style}`}>
            <FlatList ref = {flatListRef} data = {data} horizontal pagingEnabled showsHorizontalScrollIndicator = {false} onScroll = {handleScroll} renderItem = {({ item }) => { return (
                <View style = {styles.carouselItem}>
                    {item.image && (<Image source = {typeof item.image === "number" ? item.image : { "uri": item.image }} style = {styles.image} />)}
                    {item.text && <Text style = {styles.text}>{item.text}</Text>}
                </View>
            ); }} keyExtractor = {(item, index) => { return index.toString(); }} />
            <View style = {styles.indicatorContainer}>{data.map((_, index) => { return (<View key = {index} style = {[ styles.indicator, currentIndex === index ? styles.activeIndicator : styles.inactiveIndicator]} />); })}</View>
        </View>
    );
};


export default Carousel;
