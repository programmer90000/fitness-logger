import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from '@react-navigation/native';
import colours from '../../utils/colours';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export default function Footer() {
    const styles = StyleSheet.create({
        "container": {
            "flex": 1,
            "backgroundColor": colours.footer_background,
            "color": colours.footer_images,
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "space-evenly",
            "position": "absolute",
            "bottom": 0,
            "width": "100%",
            "height": "auto",
            "paddingBottom": "1%",
            "paddingTop": "1%",
            "flexDirection": "row",
        },
    });

  return (
    <View style={styles.container}>
      <Link to="/"><Entypo name="home" size={24} color="black" /></Link>
      <Link to="/"><FontAwesome5 name="history" size={24} color="black" /></Link>
      <Link to="/"><AntDesign name="plussquare" size={24} color="black" /></Link>
      <Link to="/"><MaterialCommunityIcons name="chart-line" size={24} color="black" /></Link>
      <Link to="/"><Feather name="settings" size={24} color="black" /></Link>
    </View>
  );
}
