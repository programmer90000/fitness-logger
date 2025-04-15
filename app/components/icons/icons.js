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

export { HouseIcon, ClockIcon };
