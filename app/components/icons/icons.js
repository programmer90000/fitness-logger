import Svg, { Path, Circle, Line } from "react-native-svg";

const HouseIcon = ({ size = 30, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = {color}>
            <Path d = "M12 3L2 12h2v8h5v-5h6v5h5v-8h2L12 3z" />
        </Svg>
    );
};


const ClockIcon = ({ size = 30, strokeWidth = 3, colour = "black" }) => {
    const center = size / 2;
    const handLength = size / 3;
    const minuteHandAngle = 90;
    const minuteHandAngleInRadians = (minuteHandAngle * Math.PI) / 180;

    const minuteHandX = (center + handLength) * Math.sin(minuteHandAngleInRadians);
    const minuteHandY = center - (handLength * Math.cos(minuteHandAngleInRadians));

    return (
        <Svg width = {size} height = {size} viewBox = {`0 0 ${size} ${size}`}>
            <Circle cx = {center} cy = {center} r = {center - strokeWidth} stroke = {colour} strokeWidth = {strokeWidth} fill = "none" />
            <Line x1 = {center} y1 = {center} x2 = {center} y2 = {center - handLength} stroke = {colour} strokeWidth = {strokeWidth} />            
            <Line x1 = {center} y1 = {center} x2 = {minuteHandX} y2 = {minuteHandY} stroke = {colour} strokeWidth = {strokeWidth} />
        </Svg>
    );
};

const PlusIcon = ({ size = 30, color = "black" }) => { return (
    <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = {color}>
        <Path d = "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill = {color} />
    </Svg>
); };

const LineChartIcon = ({ size = 30, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = "none" >
            <Path d = "M3 3v18h18" stroke = {color} strokeWidth = "2" />
            <Path d = "M6 14L10 10L15 15L20 8" stroke = {color} strokeWidth = "2" fill = "none" />
            <Circle cx = "6" cy = "14" r = "1.5" fill = {color} />
            <Circle cx = "10" cy = "10" r = "1.5" fill = {color} />
            <Circle cx = "15" cy = "15" r = "1.5" fill = {color} />
            <Circle cx = "20" cy = "8" r = "1.5" fill = {color} />
        </Svg>
    );
};

const GearIcon = ({ size = 30, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = "none" >
            <Circle cx = "12" cy = "12" r = "8" stroke = {color} strokeWidth = "2" />
            <Path d = "M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke = {color} strokeWidth = "4" />
            <Circle cx = "12" cy = "12" r = "4" stroke = {color} strokeWidth = "2" />
        </Svg>
    );
};

export { HouseIcon, ClockIcon, PlusIcon, LineChartIcon, GearIcon };
