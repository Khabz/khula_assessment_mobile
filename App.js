import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import { Store } from "./src/store";

export default function App() {
  let [fontLoaded] = useFonts({
    Regular: Poppins_400Regular,
    Medium: Poppins_500Medium,
    SemiBold: Poppins_600SemiBold,
    Bold: Poppins_700Bold,
  });

  if (!fontLoaded) {
    return (
      <View style={styles.container}>
        <Text style={{ letterSpacing: 5 }}>Please wait...</Text>
      </View>
    );
  } else {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <BottomTabNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
