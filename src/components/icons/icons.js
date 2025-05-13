import React from "react";
import Svg, { Path, Circle, Line, G, Polygon } from "react-native-svg";

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

const TrashIcon = ({ size = 24, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = "none">
            <Path d = "M3 6h18" stroke = {color} strokeWidth = {2} strokeLinecap = "round" />
            <Path d = "M8 6V4h8v2" stroke = {color} strokeWidth = {2} strokeLinecap = "round" strokeLinejoin = "round" />
            <Path d = "M6 6l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13H6z" stroke = {color} strokeWidth = {2} strokeLinejoin = "round" fill = "none" />
            <Path d = "M10 11v6" stroke = {color} strokeWidth = {2} strokeLinecap = "round" />
            <Path d = "M14 11v6" stroke = {color} strokeWidth = {2} strokeLinecap = "round" />
        </Svg>
    );
};

const PencilIcon = ({ size = 24, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = "none">
            <Path d = "M20.7,5.2a1.024,1.024,0,0,1,0,1.448L18.074,9.276l-3.35-3.35L17.35,3.3a1.024,1.024,0,0,1,1.448,0Zm-4.166,5.614-3.35-3.35L4.675,15.975,3,21l5.025-1.675Z" fill = {color} />
        </Svg>
    );
};

const TrophyIcon = ({ size = 100, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 512 512" fill = "none" >
            <G>
                <Path d = "M102.49,0c0,27.414,0,104.166,0,137.062c0,112.391,99.33,156.25,153.51,156.25 c54.18,0,153.51-43.859,153.51-156.25c0-32.896,0-109.648,0-137.062H102.49z M256.289,50.551l-68.164,29.768v98.474l-0.049,19.53 c-0.526-0.112-47.274-10.112-47.274-78.391c0-28.17,0-69.6,0-69.6h60.385L256.289,50.551z" fill = {color} />
                <Polygon points = "315.473,400.717 291.681,367.482 279.791,318.506 256,322.004 232.209,318.506 220.314,367.482 205.347,388.394 196.527,400.476 196.699,400.476 196.527,400.717" fill = {color} />
                <Polygon points = "366.93,432.24 366.93,432 145.07,432 145.07,511.598 145.07,511.76 145.07,511.76 145.07,512 366.93,512 366.93,432.402 366.93,432.24" fill = {color} />
                <Path d = "M511.638,96.668c-0.033-1.268-0.068-2.336-0.068-3.174V45.1h-73.889v38.736h35.152v9.658 c0,1.127,0.037,2.557,0.086,4.258c0.389,13.976,1.303,46.707-21.545,70.203c-5.121,5.266-11.221,9.787-18.219,13.613 c-3.883,17.635-10.109,33.564-18.104,47.814c26.561-6.406,48.026-17.898,64.096-34.422 C513.402,159.734,512.121,113.918,511.638,96.668z" fill = {color} />
                <Path d = "M60.625,167.955c-22.848-23.496-21.934-56.227-21.541-70.203c0.047-1.701,0.082-3.131,0.082-4.258v-9.658 h34.842h0.07l0,0h0.24V45.1H0.43v48.394c0,0.838-0.032,1.906-0.068,3.174c-0.482,17.25-1.76,63.066,32.494,98.293 c16.068,16.524,37.531,28.014,64.092,34.422c-7.996-14.25-14.22-30.182-18.103-47.816 C71.846,177.74,65.746,173.221,60.625,167.955z" fill = {color} />
            </G>
        </Svg>

    );
};

export { HouseIcon, ClockIcon, PlusIcon, LineChartIcon, GearIcon, TrashIcon, PencilIcon, TrophyIcon };