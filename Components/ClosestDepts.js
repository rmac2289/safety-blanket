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
  const formatPhoneNum = (n) => {
    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
  };

  const agencyList = Agencies.filter(
    (v) =>
      v.city.includes(props.city) ||
      (v.agency.includes(props.county) && !v.agency.includes("("))
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

  return (
    <ScrollView>
      {agencyDisplay}

      <View style={styles.container}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          On a state highway?
        </Text>
        <Text style={styles.text}>Oregon State Police</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openPhone("*677")}
        >
          <Text style={styles.buttonText}>Call Now: *677</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openMaps("3565 Trelstad Avenue SE", "Salem", "OR", "97317")
          }
          style={styles.text}
        >
          <Text style={styles.text}>
            3565 Trelstad Avenue SE, Salem, OR, 97317
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
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
    marginBottom: 2.5,
    marginTop: 2.5,
  },
});

export default ClosestDepts;
