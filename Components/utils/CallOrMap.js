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
        <FontAwesomeIcon style={styles.icon} icon={faPhone} size={25} />

        {/* <Text style={styles.buttonText}>{formatPhoneNum(phone)}</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => openMaps(street, city, state, zip)}
        style={styles.mapsButton}
      >
        <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} size={25} />
        {/* <Text style={styles.buttonText}>Open Google Maps</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    shadowColor: "rgb(40,75,220)",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 0.75,
    shadowOpacity: 1,
  },
  icon: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 50,
    padding: 5,
  },
  buttonText: {
    fontSize: 16,
    padding: 5,
    color: "rgba(255,255,255)",
  },
  button: {
    width: 85,
    marginRight: 5,
    height: 65,
    display: "flex",
    flex: 2,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgb(118, 200, 100)",
  },
  mapsButton: {
    backgroundColor: "rgba(40,75,200,0.8)",
    height: 65,
    flex: 1,
    width: 65,
    borderWidth: 2,
    borderColor: "rgba(40, 75, 200, 0.2)",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default CallOrMap;
