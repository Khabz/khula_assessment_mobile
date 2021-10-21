import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

// screens
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
        tabBarOptions={{
            showLabel: false,
            style: {
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                bottom: 40,
                marginHorizontal: 20,
                height: 60,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowOffset: {
                    width: 10,
                    height: 10
                }
            }
        }}
    >
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ focused }) => (
                <View>
                    <Feather 
                        name="home" 
                        size={20}
                        color={ focused ? '#0CF574' : 'gray' }
                    />
                </View>
            )
        }} 
        
        />
        <Tab.Screen name="Maps" component={MapScreen} options={{
            tabBarIcon: ({ focused }) => (
                <View>
                    <Feather 
                        name="map" 
                        size={20}
                        color={ focused ? '#0CF574' : 'gray' } 
                    />
                </View>
            )
        }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
