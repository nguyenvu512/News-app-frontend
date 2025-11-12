// src/navigation/HomeStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Homepage";
import WeatherDetail from "../screens/WeatherDetail";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetail} />
    </Stack.Navigator>
  );
}
