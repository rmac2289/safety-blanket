import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Error from "./Error";
import * as Location from "expo-location";
import ClosestDepts from "./ClosestDepts";
import NavButton from "./NavButton";
import {
  faCaretDown,
  faListUl,
  faMapMarkedAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { openPhone } from "../services";
import { DataContext, LoadingContext, UserLocContext } from "../context";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Main({ navigation }) {
  const [loading, setLoading] = useContext(LoadingContext);
  const [data, setData] = useContext(DataContext);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);
  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const [closestByLoc, setClosestByLoc] = useContext(UserLocContext);
  console.log(closestByLoc);
  // need to get closestByLoc to play nicely with closest departments
  useEffect(() => {
    const fetchData = () =>
      fetch("https://agile-badlands-28744.herokuapp.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              agencies {
              agency
              phone
              street  
              city
              state
              zip
            }
          }`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setData(res.data))
        .catch((err) => setError(true));

    fetchData();
  }, []);

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
      setState(reverseGeo[0].region);
      if (!reverseGeo[0].city) {
        setError(true);
      }
    })();
  }, []);

  const deptButtonPress = () => {
    navigation.navigate("States");
    setLoading(true);
  };
  const faqButtonPress = () => {
    navigation.navigate("Faq");
  };
  if (!city) {
    return <Loading initialLoad={true} message="Finding closest agencies" />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.nine11}>
        <Text style={styles.nine11Text}>Emergency?</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => openPhone("911")}
          style={styles.call911}
        >
          <Text style={styles.call911Text}>Call 9-1-1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textView}>
        <FontAwesomeIcon
          icon={faMapMarkedAlt}
          color="rgb(40,75,200)"
          size={28}
        />
        {location ? (
          <Text style={styles.text}>your closest agencies </Text>
        ) : (
          <Text style={styles.text}>{errorMsg}...</Text>
        )}
        <FontAwesomeIcon
          icon={faCaretDown}
          color="rgb(255,255,255)"
          size={42}
          style={styles.icon}
        />
      </View>
      <View>
        {city && (
          <ClosestDepts data={data} state={state} city={city} county={county} />
        )}
      </View>
      <NavButton
        buttonPress={deptButtonPress}
        icon={faListUl}
        title="All Departments"
      />
      <View style={styles.faq}>
        <NavButton
          buttonPress={faqButtonPress}
          icon={faQuestionCircle}
          title="911 FAQ"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  faq: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 20,
  },
  nine11: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    justifyContent: "center",
  },
  nine11Text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    padding: 5,
    fontVariant: ["small-caps"],
  },
  call911: {
    borderWidth: 2,
    borderColor: "rgba(220,0,0,0.8)",
    backgroundColor: "rgba(220,0,0,0.7)",
    marginLeft: 10,
    borderRadius: 8,
  },
  call911Text: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 22,
    padding: 5,
  },
  police: {
    fontWeight: "800",
    textAlign: "left",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    fontSize: 22,
    textDecorationLine: "underline",
  },
  textView: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "rgb(255,255,255)",
    backgroundColor: "rgb(255,255,255)",

    borderWidth: 1,
    borderTopWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
    padding: 3,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    bottom: -25,
    width: 25,
    left: "25%",
    marginLeft: -12.5,
  },
  text: {
    marginLeft: 10,
    color: "rgb(40,75,200)",
    fontSize: 22,
    textAlign: "left",
    fontWeight: "700",
    padding: 7,
    justifyContent: "center",
    textShadowColor: "white",
  },
});
