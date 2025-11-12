import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const days = ["Hôm qua","Hôm nay","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];

const getIcon = code =>
  code >= 61 ? require("../assets/rain.png") :
  require("../assets/rain.png");

export default function DailyForecastCard({ dayIndex, min, max, rain, code }) {
  const barWidth = `${((max-min)/20)*50}%`;

  return (
    <View style={styles.row}>
      <Text style={styles.day}>{days[dayIndex]}</Text>
      <Image source={getIcon(code)} style={{width:20,height:20}} />
      <Text style={styles.temp}>{min}°</Text>

      <View style={styles.barContainer}>
        <View style={[styles.bar,{width: barWidth}]} />
      </View>

      <Text style={styles.temp}>{max}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",marginBottom:8},
  day:{color:"#fff",width:80,fontSize:12},
  temp:{color:"#fff",width:35},
  barContainer:{flex:1,height:4,backgroundColor:"#444",borderRadius:4},
  bar:{height:4,backgroundColor:"#ffb703",borderRadius:4}
});
