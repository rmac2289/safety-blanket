import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { openPhone, openMaps, formatPhoneNum } from "../services";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native";

const ClosestDepts = (props) => {
  const filterAgencies = (v) => {
    return (
      v.city === props.city ||
      (v.agency.includes(props.county) && !v.agency.includes("(")) ||
      ((v.agency.includes("State") || v.agency.includes("Highway")) &&
        v.state === props.state)
    );
  };

  const agencyList = props.data.agencies.filter(filterAgencies);

  const displayedAgencies = agencyList.map((v) => (
    <React.Fragment key={v.agency}>
      <View style={styles.container}>
        {v.agency.includes("State") ||
          (v.agency.includes("Highway") && (
            <Text style={styles.hwyText}>On a state highway?</Text>
          ))}
        <Text style={styles.text}>{v.agency}</Text>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => openPhone(v.phone)}
          >
            <FontAwesomeIcon style={styles.icon} icon={faPhone} />
            <Text style={styles.buttonText}>
              {v.agency === "Oregon State Police"
                ? "*677"
                : formatPhoneNum(v.phone)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => openMaps(v.street, v.city, v.state, v.zip)}
            style={styles.mapsButton}
          >
            <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
            <Text style={styles.buttonText}>Open Google Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.divider} />
    </React.Fragment>
  ));

  return <ScrollView style={styles.scrollView}>{displayedAgencies}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    shadowColor: "rgb(40,75,220)",
    shadowOffset: { height: 1, width: -1 },
    shadowRadius: 0.75,
    shadowOpacity: 1,
  },
  scrollView: {
    marginBottom: 20,
  },
  icon: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 32,
    padding: 5,
  },
  hwyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgb(18,115,221)",
    marginBottom: 5,
    textAlign: "left",
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 2,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    color: "rgba(255,255,255,0.9)",
  },
  buttonText: {
    fontSize: 16,
    padding: 5,
    color: "rgba(255,255,255,0.9)",
  },
  button: {
    backgroundColor: "rgba(40,75,200,0.2)",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgba(40, 75, 200, 0.8)",
    borderRightWidth: 0,
    flex: 1,
    height: 55,
    display: "flex",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
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
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default ClosestDepts;
