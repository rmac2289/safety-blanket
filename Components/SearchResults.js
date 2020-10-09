import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Agencies } from "../Data";
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import * as Linking from "expo-linking";

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
  function compare(a, b) {
    const nameA = a.agency.toUpperCase();
    const nameB = b.agency.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };

  const agencyList = Agencies.sort(compare).filter((v) =>
    v.agency.toLowerCase().includes(props.searchText.toLowerCase())
  ).sort((a,b) => a-b).map((v) => (
    <View style={styles.container} key={v.agency}>
      <Text style={styles.text}>{v.agency}</Text>
      {/*<Text style={styles.text}>
        {v.street}, {v.city}, {v.state}, {v.zip}
  </Text>*/}
      <Button style={styles.button} onPress={() => openPhone(v.phone)}>
        <FontAwesomeIcon style={styles.icon} icon={faPhone} />

        <Text style={styles.buttonText}>
          Call Now: {formatPhoneNum(v.phone)}
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
  ))

  return <ScrollView style={styles.scrollContainer}>{agencyList}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 30,
    paddingLeft: 20,
    backgroundColor: "black"
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
