import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import DateWidget from "../components/DateWidget";
import WeatherWidget from "../components/WeatherWidget";
import GoldWidget from "../components/GoldWidget";
import NewsCard from "../components/NewsCard";

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=ad3693ba49fc4dc89ee531b7ba42868c")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .finally(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Widgets ngang */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          <DateWidget />
          <WeatherWidget />
          <GoldWidget />
        </ScrollView>

        {/* News */}
        <View style={styles.newsContainer}>
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContainer: { padding: 10, paddingTop: 0},
  row: { flexDirection: "row", gap: 10, paddingBottom: 10 },
  newsContainer: { marginTop: 10 },
});
