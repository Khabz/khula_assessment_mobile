import React, { useEffect, useState, PureComponent } from "react";
import {
  Platform,
  Animated,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getSchools } from "../store/actions";
import Feather from "@expo/vector-icons/Feather";
import SchoolItem from "../components/SchoolItem";

export default function HomeScreen() {
  const [startHeaderHeight, setStartHeaderHeight] = useState(80);
  const { schools } = useSelector((state) => state.schoolReducer);
  const dispatch = useDispatch();

  const headerHeight = () => {
    if (Platform.OS == "android") {
      setStartHeaderHeight(70 + StatusBar.currentHeight);
    }
  };

  useEffect(() => {
    headerHeight();
    dispatch(getSchools());
  });

  const SPACING = 20;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? 27 : null,
            height: startHeaderHeight,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "#DDDDDD",
          }}
        >
          <View style={styles.searchContainer}>
            <Text style={{ fontFamily: 'Bold', fontSize: 18 }}>Schools</Text>
            <Text style={{ fontFamily: 'Medium' }}>Click a school to get directions</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginBottom: SPACING * 5.3 }}>
          <Image
            source={require("../../assets/bg.jpg")}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}
          />
          <Animated.FlatList
              data={schools}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                padding: SPACING,
              }}
              renderItem={({ item }) => (
                <SchoolItem item={item} onPress={() => openMaps(item.latitude, item.longitude, item.name)} />
              )}
            />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
  },
});
