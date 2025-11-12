import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const getIcon = code =>
  code >= 61 ? require("../assets/rain.png") :
  require("../assets/day.png");

export default function HourlyForecastCard({ hour, temp, rain, code }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{hour}h</Text>
      <Image source={getIcon(code)} style={{width:26,height:26}} />
      <Text style={styles.text}>{temp}°</Text>
      <Text style={styles.rain}>{rain}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box:{alignItems:"center",marginRight:12},
  text:{color:"#fff"},
  rain:{color:"#5DA9E9",fontSize:12}
});
