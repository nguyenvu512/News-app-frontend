// src/components/WeatherWidget.js
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true&hourly=relativehumidity_2m"
    )
      .then((res) => res.json())
      .then((data) => {
        const humidity = data.hourly?.relativehumidity_2m?.[0] ?? null;
        setWeather({ ...data.current_weather, humidity });
      })
      .catch(() => setWeather(null));
  }, []);

  const getWeatherIcon = (code) => {
    // 0 = clear sky
    if (code === 0) return "☀️";
    return "☁️";
  };

  return (
    <TouchableOpacity 
      style={styles.widget}
      onPress={() => navigation.navigate("WeatherDetail", { lat: 21.0285, lon: 105.8542 })}
    >
      <Text style={styles.title}>☀️ Thời tiết</Text>
      {weather ? (
        <>
          <View style={styles.main}>
            <Text style={styles.weatherIcon}>{getWeatherIcon(weather.weathercode)}</Text>
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
          </View>
          <Text style={styles.description}>
            {weather.weathercode === 0 ? "Nắng đẹp" : "Có mây"}
          </Text>
          {weather.humidity !== null && (
            <Text style={styles.humidity}>Độ ẩm: {weather.humidity}%</Text>
          )}
        </>
      ) : (
        <Text style={styles.value}>Đang tải...</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  widget: {
    width: 160,
    height: 160,
    backgroundColor: "#fff",
    padding: 12,
    margin: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  weatherIcon: {
    fontSize: 36,
    marginRight: 6,
  },
  temperature: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  humidity: {
    fontSize: 12,
    color: "#888",
    marginTop: "auto",
  },
  value: {
    fontSize: 15,
    marginTop: 6,
  },
});
