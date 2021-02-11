import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { openPhone, openMaps, formatPhoneNum } from "../../services";

const CallOrMap = ({ phone, street, city, state, zip }) => {
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={() => openPhone(phone)}
      >
        <FontAwesomeIcon style={styles.icon} icon={faPhone} />

        <Text style={styles.buttonText}>{formatPhoneNum(phone)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => openMaps(street, city, state, zip)}
        style={styles.mapsButton}
      >
        <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
        <Text style={styles.buttonText}>Open Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    shadowColor: "rgb(40,75,220)",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 0.75,
    shadowOpacity: 1,
  },
  icon: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 32,
    padding: 5,
  },
  buttonText: {
    fontSize: 16,
    padding: 5,
    color: "rgba(255,255,255,0.9)",
  },
  button: {
    backgroundColor: "rgba(40,75,200,0.2)",
    borderWidth: 2,
    borderColor: "rgba(40, 75, 200, 0.8)",
    flex: 1,
    height: 55,
    display: "flex",
    flexDirection: "row",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  mapsButton: {
    backgroundColor: "rgba(40,75,200,0.8)",
    flex: 1,
    height: 55,
    borderWidth: 2,
    borderColor: "rgba(40, 75, 200, 0.2)",
    width: "100%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    borderLeftWidth: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default CallOrMap;
