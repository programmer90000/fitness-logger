import Svg, { Path } from "react-native-svg";

const HouseIcon = ({ size = 30, color = "black" }) => {
    return (
        <Svg width = {size} height = {size} viewBox = "0 0 24 24" fill = {color}>
            <Path d = "M12 3L2 12h2v8h5v-5h6v5h5v-8h2L12 3z" />
        </Svg>
    );
};

export { HouseIcon };
