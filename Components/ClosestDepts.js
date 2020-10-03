import React from "react";
import { Agencies } from "../Data";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Linking from "expo-linking";

const ClosestDepts = (props) => {
  const formatPhoneNum = (number) => {
    return `(${number[0]}${number[1]}${number[2]}) ${number[3]}${number[4]}${number[5]}-${number[6]}${number[7]}${number[8]}${number[9]}`;
  };

  const agencyList = Agencies.filter(
    (v) => v.city.includes(props.city) || v.agency.includes(props.county)
  );
  const phoneLink = (num) => {
    const url = `tel:${num}`;
    return Linking.openURL(url);
  };

  const agencyDisplay = agencyList.map((v) => (
    <View style={styles.container} key={v.agency}>
      <Text style={styles.text}>{v.agency}</Text>
      <TouchableOpacity onPress={phoneLink(v.phone)}>
        <Text style={styles.text}>Call Now: {formatPhoneNum(v.phone)}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Location: {v.street}, {v.city}, {v.state}, {v.zip}
      </Text>
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
});

export default ClosestDepts;
