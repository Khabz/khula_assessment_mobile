import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { showLocation } from "react-native-map-link";

// Extend the PureComponent class to inherit the componentDidMount, componentDidUpdate methods and handle large data changes.
class SchoolItem extends PureComponent {
  render() {
    const { item } = this.props;
    const SPACING = 20;

    const openMaps = (lat, long, name) => {
      showLocation({
        latitude: lat,
        longitude: long,
        title: name,
        googleForceLatLon: false,
        alwaysIncludeGoogle: true,
      });
    };
    return (
      <TouchableOpacity
        onPress={() => openMaps(item.latitude, item.longitude, item.name)}
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
      </TouchableOpacity>
    );
  }
}

export default SchoolItem;
