import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import CitySelector from "../components/CitySelector";
import HourlyForecastCard from "../components/HourlyForecastCard";
import DailyForecastCard from "../components/DailyForecastCard";
import LottieView from "lottie-react-native";

export default function WeatherDetail({ route }) {
  const { lat: defaultLat, lon: defaultLon, city: defaultCity } = route.params;

  const [city, setCity] = useState(defaultCity);
  const [lat, setLat] = useState(defaultLat);
  const [lon, setLon] = useState(defaultLon);
  const [data, setData] = useState(null);

  const updateCity = (c) => {
    setCity(c.name);
    setLat(c.lat);
    setLon(c.lon);
  };

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7`
    )
      .then(res => res.json())
      .then(setData)
      .catch(err => console.log(err));
  }, [lat, lon]);

  // Nếu data chưa có → hiển thị loading
  if (!data) return <Text style={{ padding: 20 }}>⏳ Đang tải...</Text>;

  // Lấy dữ liệu sau khi chắc chắn data != null
  const { current_weather: current, daily, hourly } = data;
  const isRaining = current.weathercode === 61 || current.weathercode === 63 || current.weathercode === 65;


  return (
    <View style={styles.container}>
      {/* Animation nếu đang mưa */}
      {isRaining && (
        <LottieView
          source={require('../assets/rain.json')}
          autoPlay
          loop
          style={[StyleSheet.absoluteFill, { zIndex: 999 }]}
          resizeMode="cover"
        />)}
      
      {/* Header */}
      <View style={{ zIndex: 1000 }}>
        <CitySelector currentCity={city} onChangeCity={updateCity} />
      </View>

      <Text style={styles.temp}>{current.temperature}°C</Text>
      <Text style={styles.desc}>U ám</Text>

      {/* Hourly Forecast */}
      <BlurView intensity={50} style={styles.card}>
        <Text style={styles.cardTitle}>🕓 Dự báo hàng giờ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hourly.temperature_2m.slice(0, 10).map((temp, i) => (
            <HourlyForecastCard
              key={i}
              hour={i}
              temp={temp}
              rain={hourly.precipitation_probability?.[i] || 0}
              code={hourly.weathercode?.[i] || 0}
            />
          ))}
        </ScrollView>
      </BlurView>

      {/* Daily Forecast */}
      <BlurView intensity={50} style={styles.card}>
        <Text style={styles.cardTitle}>📅 Dự báo hàng ngày</Text>
        {daily.temperature_2m_max.map((max, i) => (
          <DailyForecastCard
            key={i}
            dayIndex={i}
            min={daily.temperature_2m_min[i]}
            max={max}
            rain={daily.precipitation_probability_max?.[i] || 0}
            code={daily.weathercode[i]}
          />
        ))}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1117", padding: 16 },
  temp: { fontSize: 70, fontWeight: "200", color: "#fff", textAlign: "center" },
  desc: { fontSize: 20, color: "#aaa", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 12,
    borderRadius: 20,
    marginBottom: 16
  },
  cardTitle: { color: "#fff", fontWeight: "600", marginBottom: 8 }
});
