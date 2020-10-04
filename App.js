import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import ClosestDepts from "./Components/ClosestDepts";
import Search from "./Components/Search";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);
  const [county, setCounty] = useState(null);

  const openPhone = (num) => {
    const url = `tel:${num}`;
    return Linking.openURL(url);
  };

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
    <ScrollView style={styles.container}>
      <View style={styles.nine11}>
        <Text style={styles.nine11Text}>Emergency? Dial</Text>
        <TouchableOpacity
          onPress={() => openPhone("911")}
          style={styles.call911}
        >
          <Text style={styles.call911Text}>9-1-1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textView}>
        {location ? (
          <Text style={styles.text}>{city} Public Safety Agencies</Text>
        ) : (
          <Text style={styles.text}>{errorMsg}...</Text>
        )}
      </View>
      <View>
        {city != null && <ClosestDepts city={city} county={county} />}
      </View>
      <Search />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
  },
  nine11: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    paddingTop: 30,
    justifyContent: "center",
  },
  nine11Text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    padding: 5,
  },
  call911: {
    backgroundColor: "red",
    marginLeft: 10,
    borderRadius: 5,
  },
  call911Text: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    padding: 5,
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
    backgroundColor: "black",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    padding: 5,
  },
});
