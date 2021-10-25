import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Feather } from "@expo/vector-icons";

export default function MapScreen(navigation) {
  const [region, setRegion] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const { schools } = useSelector((state) => state.schoolReducer);
  const dispatch = useDispatch();
  const LOCATION_TASK_NAME = "background-location-task";

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      return;
    }
    if (data) {
      const { locations } = data;
    }
  });

  const handleOnClick = (school) => {
    console.log("Something");
    console.log(school);
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    } else if (status === "granted") {
      alert("Permission to access location was granted");
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10,
      });
    }
  };

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  return (
    <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
      >
        {schools.map((school) => (
          <Marker
            onSelect={() => handleOnClick(school)}
            key={school.id.toString()}
            icon={{
                // school icon
                uri: "https://img.icons8.com/color/48/000000/school-building.png",
            }}
            coordinate={{
              latitude: school.latitude,
              longitude: school.longitude,
            }}
          >
              <MapView.Callout
              >
                <View>
                    <Text style={{ fontFamily: 'SemiBold' }}>{school.name}</Text>
                    <Text style={{ fontFamily: 'SemiBold' }}>{school.address}</Text>
                </View>
              </MapView.Callout>
          </Marker>
        ))}
      </MapView>
  );
}
