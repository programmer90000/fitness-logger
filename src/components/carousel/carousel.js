import React, { useRef, useState, useEffect } from "react";
import { FlatList, View, Image, Text, Dimensions } from "react-native";

const Carousel = ({ data, style, autoScroll = true, interval = 3000 }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const { width } = Dimensions.get("window");
    const loopedData = [data[data.length - 1], ...data, data[0]];

    const handleTouchStart = () => {
        setUserHasScrolled(true);
    };

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    const scrollToNext = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ "index": currentIndex + 1, "animated": true });
        }
    };

    useEffect(() => {
        let timer;
        if (autoScroll && !userHasScrolled) {
            timer = setInterval(scrollToNext, interval);
        }
        return () => { return clearInterval(timer); };
    }, [currentIndex, autoScroll, interval, userHasScrolled]);

    useEffect(() => {
        if (!flatListRef.current) { return; }

        if (currentIndex === 0) {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({ "index": data.length, "animated": false });
                setCurrentIndex(data.length);
            }, 300);
        } else if (currentIndex === data.length + 1) {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({ "index": 1, "animated": false });
                setCurrentIndex(1);
            }, 300);
        }
    }, [currentIndex]);

    return (
        <View className = {`h-[300px] ${style}`}>
            <FlatList ref = {flatListRef} data = {loopedData} horizontal pagingEnabled showsHorizontalScrollIndicator = {false} onScroll = {handleScroll} onTouchStart = {handleTouchStart} renderItem = {({ item }) => { return (
                <View className = "w-full items-center justify-start">
                    {item.image && (<Image source = {typeof item.image === "number" ? item.image : { "uri": item.image }} className = "w-[90%] h-[200px] rounded-[10px]" resizeMode = "cover" />)}
                    {item.text && <Text className = "mt-[10px] text-[16px] text-[#333]">{item.text}</Text>}
                </View>
            ); }} keyExtractor = {(_, index) => { return index.toString(); }} initialScrollIndex = {1} getItemLayout = {(_, index) => { return {
                "length": width,
                "offset": width * index,
                index,
            }; }} />
            <View className = "absolute bottom-[10px] w-full flex-row justify-center items-center">
                {data.map((_, index) => { return (<View key = {index} className = {`w-[10px] h-[10px] rounded-full mx-[5px] ${currentIndex === index + 1 ? "bg-[#333]" : "bg-[#ccc]"}`} />); })}
            </View>
        </View>
    );
};

export default Carousel;
