import React, { useEffect, useState } from "react";
import {
  Platform,
  Animated,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getSchools } from "../store/actions";
import Feather from "@expo/vector-icons/Feather";

export default function HomeScreen() {
  const [startHeaderHeight, setStartHeaderHeight] = useState(80);
  const [search, setSearch] = useState("");
  const [filterSchools, setFilterSchools] = useState([]);
  const { schools } = useSelector((state) => state.schoolReducer);
  const dispatch = useDispatch();

  const headerHeight = () => {
    if (Platform.OS == "android") {
      setStartHeaderHeight(70 + StatusBar.currentHeight);
    }
  };

  const filterSchoolsByName = () => {
    setFilterSchools(schools.filter((school) => school.name.includes(search)));
  };

  const renderSchools = () => {
    schools.map((school) => (
      <View key={school.id}>
        <Text>Heello</Text>
      </View>
    ));
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
              onChange={() => filterSchoolsByName()}
              value={search}
              style={{
                flex: 1,
                backgroundColor: "white",
                fontFamily: "Regular",
              }}
            />
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
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: SPACING,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  alignItems: "center",
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                }}
              >
                <Image
                  source={{ uri: item.imageLink }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    marginRight: SPACING / 2,
                  }}
                />
                <View style={{ maxWidth: 200 }}>
                  <Text style={{ fontFamily: "SemiBold" }}>{item.name}</Text>
                  <Text style={{ fontFamily: "Medium", fontSize: 11 }}>
                    {item.address}
                  </Text>
                </View>
              </View>
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
