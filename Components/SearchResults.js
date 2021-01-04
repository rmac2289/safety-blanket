import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { alphaSort, openPhone, openMaps, formatPhoneNum } from "../services";
import { Divider } from "react-native-elements";
import { DataContext } from "../context";
import * as Contacts from "expo-contacts";

const SearchResults = (props) => {
  const [data] = useContext(DataContext);

  const add = async (agency, phone) => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const contact = {
        [Contacts.Fields.FirstName]: agency,
        [Contacts.Fields.PhoneNumbers]: [{ number: phone }],
      };
      await Contacts.addContactAsync(contact)
        .then((success) => alert("success!"))
        .catch((err) => console.log(err));
    }
  };

  const agencyData = data.agencies;
  const agencyList = agencyData
    .sort(alphaSort)
    .filter((v) => {
      return (
        v.agency.toLowerCase().includes(props.searchText.toLowerCase()) &&
        v.state === props.state
      );
    })
    .map((v, i) => {
      return (
        <React.Fragment key={`${v.agency}${(i * 100) % 30}`}>
          <View style={styles.container}>
            <Text style={styles.firstLetter}>
              {v.agency.slice(0, 1)}
              <Text style={styles.text}>{v.agency.slice(1)}</Text>
              <FontAwesomeIcon
                onPress={() => add(v.agency, v.phone)}
                icon={faAddressBook}
                color="rgba(255,255,255,0.95)"
              />
            </Text>

            <View style={styles.buttonBox}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={() => openPhone(v.phone)}
              >
                <FontAwesomeIcon style={styles.icon} icon={faPhone} />

                <Text style={styles.buttonText}>{formatPhoneNum(v.phone)}</Text>
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
          <Divider />
        </React.Fragment>
      );
    });

  return <ScrollView style={styles.scrollContainer}>{agencyList}</ScrollView>;
};

const styles = StyleSheet.create({
  firstLetter: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
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
    shadowColor: "rgb(40,75,220)",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 0.75,
    shadowOpacity: 1,
  },
  scrollContainer: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 32,
    padding: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
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
    flex: 1,
    height: 55,
    display: "flex",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
export default SearchResults;
