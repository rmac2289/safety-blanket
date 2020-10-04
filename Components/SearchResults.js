import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Agencies } from "../Data";
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const SearchResults = (props) => {
  const formatPhoneNum = (n) => {
    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
  };

  const agencyList = Agencies.map((v) => (
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
  )).filter((v) =>
    v.key.toLowerCase().includes(props.searchText.toLowerCase())
  );

  return <ScrollView style={styles.scrollContainer}>{agencyList}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingBottom: 10,
  },
  scrollContainer: {
    width: "95%",
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
