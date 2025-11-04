import React from "react";
import { View, Text, StyleSheet } from "react-native";

const getLunarDate = (date) => {
  // ví dụ tạm thời, bạn có thể thay bằng hàm tính âm lịch thật
  return "15 Tháng 10 ÂL";
};

export default function DateWidget() {
  const today = new Date();
  const dayNumber = today.getDate(); // số ngày
  const month = today.toLocaleDateString("vi-VN", { month: "long" }); // Tháng
  const lunarDate = getLunarDate(today);

  return (
    <View style={styles.widget}>
      {/* Dòng icon + Hôm nay */}
      <View style={styles.titleRow}>
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.title}>Hôm nay</Text>
      </View>

      {/* Số ngày to */}
      <Text style={styles.dayNumber}>{dayNumber}</Text>

      {/* Tháng */}
      <Text style={styles.month}>{month}</Text>

      {/* Ngày âm lịch */}
      <Text style={styles.lunar}>{lunarDate}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
    justifyContent: "center",
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  dayNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  month: {
    fontSize: 16,
    marginTop: 4,
    color: "#555",
  },
  lunar: {
    fontSize: 14,
    marginTop: "auto",
    color: "#888",
  },
});
