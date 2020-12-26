import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import oregon from "../assets/gettyimages-927443876-170667a.jpg";
import SafeAreaView from "react-native-safe-area-view";
import * as Location from "expo-location";
import ClosestDepts from "./ClosestDepts";
import { Divider } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { openPhone } from "../services";
import { DataContext, LoadingContext } from "../context";
import Loading from "./Loading";

export default function Main({ navigation }) {
  const [loading, setLoading] = useContext(LoadingContext);
  const [data, setData] = useContext(DataContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);
  const [county, setCounty] = useState(null);
  const [buttonColor, setButtonColor] = useState(false);

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
        .catch((err) => console.log(err));

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
    })();
  }, []);

  const buttonPress = () => {
    navigation.navigate("Search");
    setLoading(true);
  };
  if (!county) {
    return <Loading message="Finding closest agencies" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView>
        <View style={styles.nine11}>
          <Text style={styles.nine11Text}>Emergency? Call</Text>
          <TouchableOpacity
            activeOpacity={0.5}
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
        <Divider style={styles.divider} />
        <View>
          {city && <ClosestDepts data={data} city={city} county={county} />}
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={buttonPress}
          onPressIn={() => setButtonColor(true)}
          onPressOut={() => setButtonColor(false)}
        >
          <Text style={styles.text}>All Departments</Text>

          <FontAwesomeIcon
            style={{ marginLeft: 50 }}
            color="rgba(255,255,255,0.9)"
            size={38}
            icon={faLongArrowAltRight}
          />
        </TouchableOpacity>
        <View style={styles.faq}>
          <Image source={oregon} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Faq")}
            style={styles.faqButton}
          >
            <Text style={styles.nine11Text}>911 FAQ</Text>
          </TouchableOpacity>
        </View>
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
  faq: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  spinner: {
    position: "absolute",
    bottom: 75,
  },
  loading: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundLoading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: Dimensions.get("window").height,
  },
  faqButton: {
    backgroundColor: "rgba(40,75,200,0.2)",
    borderWidth: 2,
    borderColor: "rgba(40,75,200,0.8)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "55%",
  },
  image: {
    height: 50,
    width: 75,
    opacity: 0.9,
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 2,
    marginBottom: 10,
  },
  nine11: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    paddingTop: 40,
    justifyContent: "center",
  },
  nine11Text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    padding: 5,
  },
  call911: {
    borderWidth: 3,
    borderColor: "rgba(220,0,0,0.8)",
    marginLeft: 10,
    borderRadius: 2,
  },
  call911Text: {
    color: "rgba(255,255,255,0.9)",
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
    width: "95%",
    marginLeft: "auto",
    marginRight: 0,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 22,
    textAlign: "left",
    fontWeight: "700",
    padding: 7,
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
    marginLeft: 0,
    marginRight: "auto",
    padding: 3,
    marginBottom: 25,
    borderRadius: 10,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
