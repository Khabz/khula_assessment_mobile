import React, { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function HomeScreen() {
  const [startHeaderHeight, setStartHeaderHeight] = useState(80);

  const headerHeight = () => {
    if (Platform.OS == "android") {
      setStartHeaderHeight(70 + StatusBar.currentHeight);
    }
  };

  useEffect(() => {
    headerHeight();
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === 'android'? 27 : null,
            height: startHeaderHeight,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "#DDDDDD",
          }}
        >
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color="grey"
              style={{ marginRight: 10 }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Search school...."
              placeholderTextColor="grey"
              style={{ flex: 1, backgroundColor: "white" }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    elevation: 1,
  },
});
