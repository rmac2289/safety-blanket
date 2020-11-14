import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import ClosestDepts from "./ClosestDepts";
import { Divider } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function Main({ navigation }) {
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
    <SafeAreaView style={{backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
    <ScrollView>
      <View style={styles.nine11}>
        <Text style={styles.nine11Text}>Emergency? Call</Text>
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
          backgroundColor: "rgba(255,255,255,0.2)",
          height: 5,
          marginBottom: 10,
        }}
      />
      <View>
        {city != null && <ClosestDepts city={city} county={county} />}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.text}>See All Departments</Text>

        <FontAwesomeIcon
          style={{ marginLeft: 15 }}
          color="white"
          size={32}
          icon={faArrowAltCircleRight}
        />
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
  nine11: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    paddingTop: 40,
    justifyContent: "center",
  },
  nine11Text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
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
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    borderWidth: 2,
    borderColor: "rgb(0,0,0)",
    backgroundColor: "rgba(255,255,255,0.4)",
    marginLeft: 0,
    marginRight: "auto",
    padding: 10,
    marginBottom: 25,
    borderRadius: 20,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
