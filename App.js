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
import { Divider, Button } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons";

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
        setErrorMsg("Location Permission Denied");
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
          <Text style={styles.text}>public safety agencies near you</Text>
        ) : (
          <Text style={styles.text}>{errorMsg}...</Text>
        )}
      </View>
      <Divider
        style={{
          backgroundColor: "rgba(255,255,255,0.4)",
          height: 5,
          marginBottom: 10,
        }}
      />
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
    backgroundColor: "rgb(0,0,0)",
  },
  nine11: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    paddingTop: 60,
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
    fontWeight: "700",
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
    marginRight: 0,
    backgroundColor: "rgba(255,255,255,0.4)",
    height: 75,
    borderWidth: 5,
    borderColor: "black",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightWidth: 0,
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "left",
    fontWeight: "700",
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
  },
});
