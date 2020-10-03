import React from "react";
import { Agencies } from "../Data";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import * as Linking from "expo-linking";

const ClosestDepts = (props) => {
  const formatPhoneNum = (number) => {
    let match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  };

  const agencyList = Agencies.filter(
    (v) => v.city.includes(props.city) || v.agency.includes(props.county)
  );
  const openPhone = (num) => {
    const url = `tel:${num}`;
    return Linking.openURL(url);
  };
  const openMaps = (street, city, state, zip) => {
    street = street.split(" ").join("+");
    let url = `https://www.google.com/maps/search/?api=1&query=${street}%2C${city}%2C${state}%2C${zip}`;
    Linking.openURL(url);
  };
  const agencyDisplay = agencyList.map((v) => (
    <View style={styles.container} key={v.agency}>
      <Text style={styles.text}>{v.agency}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openPhone(v.phone)}
      >
        <Text style={styles.buttonText}>
          Call Now: {formatPhoneNum(v.phone)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openMaps(v.street, v.city, v.state, v.zip)}
        style={styles.text}
      >
        <Text style={styles.text}>
          {v.street}, {v.city}, {v.state}, {v.zip}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  console.log(agencyDisplay);

  return <ScrollView>{agencyDisplay}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#51A0D5",
    borderRadius: 5,
    padding: 10,
  },
});

export default ClosestDepts;
