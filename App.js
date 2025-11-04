// App.js
import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/Homepage";
import FavoritesScreen from "./src/screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Header custom */}
      <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
        <View style={{ alignItems: 'center', paddingVertical: 0 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333'}}>News App</Text>
        </View>
      </SafeAreaView>

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
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
