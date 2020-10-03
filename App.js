import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import ClosestDepts from "./Components/ClosestDepts";
import Search from "./Components/Search";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);
  const [county, setCounty] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let reverseGeo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setCity(reverseGeo[0].city);
      setCounty(reverseGeo[0].subregion);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        {location ? (
          <Text style={styles.text}>
            You're in {city}, the closest department is..
          </Text>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </View>
      <View>
        <Text style={styles.police}>Police</Text>
        {city != null && <ClosestDepts city={city} county={county} />}
      </View>
      <Search />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    width: "100%",
    height: Dimensions.get("window").height,
  },
  police: {
    fontWeight: "800",
    textAlign: "left",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    fontSize: 24,
    textDecorationLine: "underline",
  },
  textView: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
