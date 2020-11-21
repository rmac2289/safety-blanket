import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Agencies } from "../Data";
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import * as Linking from "expo-linking";
import { Divider } from "react-native-elements";

const SearchResults = (props) => {
  const formatPhoneNum = (n) => {
    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
  };
  const openMaps = (street, city, state, zip) => {
    street = street.split(" ").join("+");
    if (city.split(" ").length > 1) {
      city = city.split(" ").join("%2C");
    }
    let url = `https://www.google.com/maps/search/?api=1&query=${street}%2C${city}%2C${state}%2C${zip}`;
    Linking.openURL(url);
  };
  const openPhone = (num) => {
    const url = `tel:${num}`;
    return Linking.openURL(url);
  };
  function aToZ(a, b) {
    const nameA = a.agency.toUpperCase();
    const nameB = b.agency.toUpperCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  const agencyList = Agencies.sort(aToZ)
    .filter((v) =>
      v.agency.toLowerCase().includes(props.searchText.toLowerCase())
    )
    .sort((a, b) => a - b)
    .map((v) => {
      let divider;
      v.alpha && v.alpha === "A"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>A</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "B"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>B</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "C"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>C</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "D"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>D</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "E"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>E</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "F"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>F</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "G"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>G</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "H"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>H</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "I"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>I</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "J"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>J</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "K"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>K</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "L"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>L</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "M"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>M</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "N"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>N</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "O"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>O</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "P"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>P</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "Q"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>Q</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "R"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>R</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "S"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>S</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "T"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>T</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "U"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>U</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "V"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>V</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "W"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>W</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "X"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>X</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "Y"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>Y</Text>
            </View>
          ))
        : v.alpha !== undefined && v.alpha === "Z"
        ? (divider = (
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>Z</Text>
            </View>
          ))
        : (divider = (
            <Divider
              style={{
                marginBottom: 20,
                backgroundColor: "rgba(255,255,255,0.3)",
                height: 1,
              }}
            />
          ));
      return (
        <React.Fragment key={v.agency}>
          {divider}
          <View style={styles.container}>
            <Text style={styles.text}>{v.agency}</Text>
            <Button style={styles.button} onPress={() => openPhone(v.phone)}>
              <FontAwesomeIcon style={styles.icon} icon={faPhone} />

              <Text style={styles.buttonText}>
                {formatPhoneNum(v.phone)}
              </Text>
            </Button>
            <Button
              onPress={() => openMaps(v.street, v.city, v.state, v.zip)}
              style={styles.mapsButton}
            >
              <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
              <Text style={styles.buttonText}>Open in Google Maps</Text>
            </Button>
          </View>
        </React.Fragment>
      );
    });

  return <ScrollView style={styles.scrollContainer}>{agencyList}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 30,
    paddingLeft: 20,
    backgroundColor: "black",
  },
  dividerView: {
    backgroundColor: "grey",
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
  },
  dividerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    paddingLeft: 10,
  },
  scrollContainer: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "white",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#51A0D5",
    borderRadius: 5,
    padding: 10,
    marginBottom: 2.5,
    marginTop: 2.5,
  },
  mapsButton: {
    backgroundColor: "rgba(128,0,0,0.8)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 2.5,
    marginTop: 2.5,
  },
});
export default SearchResults;
