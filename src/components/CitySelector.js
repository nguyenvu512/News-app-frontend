import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const cities = [
  { name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { name: "Hồ Chí Minh", lat: 10.8231, lon: 106.6297 },
  { name: "Đà Nẵng", lat: 16.0471, lon: 108.2068 },
  { name: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
  { name: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
];

export default function CitySelector({ currentCity, onChangeCity }) {
    const [modalVisible, setModalVisible] = useState(false);
  
    const selectCity = (city) => {
      setModalVisible(false);
      onChangeCity(city);
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{currentCity}</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.change}>▾ Chọn nơi khác</Text>
      </TouchableOpacity>

      {/* Modal chọn tỉnh */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn tỉnh/thành</Text>

            <FlatList
              data={cities}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => selectCity(item)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{alignItems:"center"},
  city:{fontSize:22,color:"#fff",fontWeight:"600"},
  change:{color:"#5DA9E9",marginTop:4},
  modalWrapper:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.6)",
    justifyContent:"center",
    alignItems:"center"
  },
  modalContent:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:12,
    padding:16,
  },
  modalTitle:{
    fontSize:18,
    fontWeight:"600",
    marginBottom:10,
  },
  item:{
    paddingVertical:12,
    borderBottomWidth:1,
    borderBottomColor:"#eee",
  },
  itemText:{fontSize:16},
  close:{
    marginTop:15,
    textAlign:"center",
    color:"red",
    fontSize:16,
    fontWeight:"600"
  }
});
