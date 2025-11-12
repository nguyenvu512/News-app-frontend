// App.js
import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/Homepage";
import FavoritesScreen from "./src/screens/FavoriteScreen";
import HomeStack from "./src/navigation/HomeStack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }) {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "Home":
                return <Ionicons name="home" size={size} color={color} />;
              case "Favorites":
                return <Ionicons name="heart" size={size} color={color} />;
              case "Logout":
                return <Ionicons name="log-out" size={size} color={color} />;
              default:
                return null;
            }
          },
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { paddingVertical: 5, height: 20 },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen
          name="Logout"
          component={View} // Không cần màn hình riêng
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Alert.alert("Thoát", "Bạn có chắc muốn đăng xuất?", [
                { text: "Hủy", style: "cancel" },
                {
                  text: "Đăng xuất",
                  onPress: () => navigation.replace("Login"),
                },
              ]);
            },
          }}
        />
      </Tab.Navigator>
  
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
<<<<<<< Updated upstream
=======

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              if (route.name === "Home") {
                return <Ionicons name="home" size={size} color={color} />;
              }
              if (route.name === "Favorites") {
                return <Ionicons name="heart" size={size} color={color} />;
              }
              return null; // luôn return một component
            },
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { paddingVertical: 5, height: 70 },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
>>>>>>> Stashed changes
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffdf8",
  },
});
