import React, { useEffect } from "react";
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
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "react-native-elements";

const ClosestDepts = (props) => {
  const formatPhoneNum = (n) => {
    return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
  };

  const agencyList = Agencies.filter(
    (v) =>
      v.city === props.city ||
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
    <React.Fragment key={v.agency}>
      <View style={styles.container}>
        <Text style={styles.text}>{v.agency}</Text>
        {/*<Text style={styles.text}>
        {v.street}, {v.city}, {v.state}, {v.zip}
  </Text>*/}
        <Button style={styles.button} onPress={() => openPhone(v.phone)}>
          <FontAwesomeIcon style={styles.icon} icon={faPhone} />
          <Text style={styles.buttonText}>{formatPhoneNum(v.phone)}</Text>
        </Button>
        <Button
          onPress={() => openMaps(v.street, v.city, v.state, v.zip)}
          style={styles.mapsButton}
        >
          <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
          <Text style={styles.buttonText}>Open in Google Maps</Text>
        </Button>
      </View>
      <Divider
        style={{
          backgroundColor: "rgba(255,255,255,0.4)",
          height: 5,
          marginBottom: 10,
        }}
      />
    </React.Fragment>
  ));

  return (
    <ScrollView style={styles.scrollView}>
      {agencyDisplay}

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "skyblue",
            marginBottom: 5,
          }}
        >
          On a state highway?
        </Text>
        <Text style={styles.text}>Oregon State Police</Text>
        {/*<Text style={styles.text}>
          3565 Trelstad Avenue SE, Salem, OR, 97317
  </Text>*/}

        <Button style={styles.button} onPress={() => openPhone("*677")}>
          <FontAwesomeIcon style={styles.icon} icon={faPhone} />
          <Text style={styles.buttonText}>*677</Text>
        </Button>
        <Button
          onPress={() =>
            openMaps("3565 Trelstad Avenue SE", "Salem", "OR", "97317")
          }
          style={styles.mapsButton}
        >
          <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} />
          <Text style={styles.buttonText}>Open in Google Maps</Text>
        </Button>
      </View>
      <Divider
        style={{ backgroundColor: "rgba(255,255,255,0.4)", height: 5 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
    paddingBottom: 5,
  },
  scrollView: {
    marginBottom: 20,
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "white",
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

export default ClosestDepts;
