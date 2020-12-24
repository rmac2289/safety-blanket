import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { alphaSort, openPhone, openMaps, formatPhoneNum } from "../services";
import { Divider } from "react-native-elements";

const SearchResults = (props) => {
  const agencyData = props.data;
  const agencyList = agencyData
    .slice()
    .sort(alphaSort)
    .filter((v) =>
      v.agency.toLowerCase().includes(props.searchText.toLowerCase())
    )
    .map((v) => {
      return (
        <React.Fragment key={v.agency}>
          <View style={styles.container}>
            <Text style={styles.firstLetter}>
              {v.agency.slice(0, 1)}
              <Text style={styles.text}>{v.agency.slice(1)}</Text>
            </Text>

            <View style={styles.buttonBox}>
              <Pressable
                style={styles.button}
                onPress={() => openPhone(v.phone)}
              >
                <FontAwesomeIcon style={styles.icon} icon={faPhone} />

                <Text style={styles.buttonText}>{formatPhoneNum(v.phone)}</Text>
              </Pressable>
              <Pressable
                onPress={() => openMaps(v.street, v.city, v.state, v.zip)}
                style={styles.mapsButton}
              >
                <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
                <Text style={styles.buttonText}>Open Google Maps</Text>
              </Pressable>
            </View>
          </View>
          <Divider />
        </React.Fragment>
      );
    });

  return <ScrollView style={styles.scrollContainer}>{agencyList}</ScrollView>;
};

const styles = StyleSheet.create({
  firstLetter: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
  },
  container: {
    width: "95%",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    color: "white",
    fontSize: 32,
    padding: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "rgba(255,255,255,0.9)",
  },
  buttonText: {
    fontSize: 16,
    padding: 5,
    color: "rgba(255,255,255,0.95)",
  },
  button: {
    backgroundColor: "rgba(40,75,200,0.2)",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgba(40, 75, 200, 0.8)",
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
export default SearchResults;
