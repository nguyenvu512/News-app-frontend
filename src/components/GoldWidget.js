import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GoldWidget() {
  const [gold, setGold] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=VND")
      .then((res) => res.json())
      .then((data) => {
        const usdToVnd = data?.rates?.VND || 25000;
        const buyValue = 75.5 * usdToVnd;
        const sellValue = 77.2 * usdToVnd;

        const buy = buyValue.toLocaleString("vi-VN") + "đ";
        const sell = sellValue.toLocaleString("vi-VN") + "đ";

        const buyUp = Math.random() > 0.5;
        const sellUp = Math.random() > 0.5;

        setGold({ buy, sell, buyUp, sellUp });
      });
  }, []);

  return (
    <View style={styles.widget}>
      {/* Title ở trên */}
      <Text style={styles.titleRow}>
        <Text style={styles.icon}>💰</Text> <Text style={styles.title}>Giá vàng</Text>
      </Text>

      {gold ? (
        <>
          {/* Mua */}
          <Text style={styles.label}>Mua</Text>
          <Text style={styles.price}>
            {gold.buy} {gold.buyUp ? "↑" : "↓"}
          </Text>

          {/* Bán */}
          <Text style={styles.label}>Bán</Text>
          <Text style={styles.price}>
            {gold.sell} {gold.sellUp ? "↑" : "↓"}
          </Text>
        </>
      ) : (
        <Text style={styles.price}>Đang tải...</Text>
      )}
    </View>
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
    justifyContent: "flex-start", // title lên trên
    alignItems: "center",
  },
  titleRow: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "start",
    alignSelf: "flex-start", // <-- cho Text căn trái
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
