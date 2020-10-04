import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Agencies } from "../Data";

const SearchResults = (props) => {
  const formatPhoneNum = (n) => {
    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
  };

  const agencyList = Agencies.map((v) => (
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
  )).filter((v) =>
    v.key.toLowerCase().includes(props.searchText.toLowerCase())
  );

  return <ScrollView style={styles.container}>{agencyList}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
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
export default SearchResults;
