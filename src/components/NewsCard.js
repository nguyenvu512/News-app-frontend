// src/components/NewsCard.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";

export default function NewsCard({ article, onPress }) {
  if (!article) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" }]}>
          <Text>Không có ảnh</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description || "Không có mô tả"}
        </Text>
        <Text style={styles.date}>
          {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },
});
