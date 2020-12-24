import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { openPhone, openMaps } from "../services";
import { Divider } from "react-native-elements";
import { gql, useQuery } from "@apollo/client";
import { Pressable } from "react-native";

export const GET_AGENCIES = gql`
  query getAgencies {
    agencies {
      agency
      phone
      street
      city
      state
      zip
    }
  }
`;

const ClosestDepts = (props) => {
  const { loading, error, data } = useQuery(GET_AGENCIES);
  const formatPhoneNum = (n) => {
    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
  };
  if (loading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  const agencyList = data.agencies.filter((v) => {
    return (
      v.city === props.city ||
      (v.agency.includes(props.county) && !v.agency.includes("("))
    );
  });
  const agencyDisplay = agencyList.map((v) => (
    <React.Fragment key={v.agency}>
      <View style={styles.container}>
        <Text style={styles.text}>{v.agency}</Text>
        <View style={styles.buttonBox}>
          <Pressable style={styles.button} onPress={() => openPhone(v.phone)}>
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
      <Divider style={styles.divider} />
    </React.Fragment>
  ));

  return (
    <ScrollView style={styles.scrollView}>
      {agencyDisplay}
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "rgb(18,115,221)",
            marginBottom: 5,
            textAlign: "left",
          }}
        >
          On a state highway?
        </Text>
        <Text style={styles.text}>Oregon State Police</Text>
        <View style={styles.buttonBox}>
          <Pressable style={styles.button} onPress={() => openPhone("*677")}>
            <FontAwesomeIcon style={styles.icon} icon={faPhone} />
            <Text style={styles.buttonText}>*677</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              openMaps("3565 Trelstad Avenue SE", "Salem", "OR", "97317")
            }
            style={styles.mapsButton}
          >
            <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
            <Text style={styles.buttonText}>Open Google Maps</Text>
          </Pressable>
        </View>
      </View>
      <Divider style={styles.divider} />
    </ScrollView>
  );
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
  },
  scrollView: {
    marginBottom: 20,
  },
  icon: {
    color: "white",
    fontSize: 32,
    padding: 5,
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 2,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "white",
  },
  buttonText: {
    fontSize: 18,
    padding: 5,
    color: "white",
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

export default ClosestDepts;
