import React, { useContext, useState } from "react";
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
import ContactsModal from "./ContactsModal";

const SearchResults = (props) => {
  const [data] = useContext(DataContext);
  const [currentPhone, setPhone] = useState("");
  const [currentStreet, setStreet] = useState("");
  const [currentCity, setCity] = useState("");
  const [currentZip, setZip] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAgency, setCurrentAgency] = useState("");
  const toggleModal = (current, phone, street, city, zip) => {
    setShowModal(!showModal);
    setCurrentAgency(current);
    setPhone(phone);
    setStreet(street);
    setCity(city);
    setZip(`${zip}`);
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
            <TouchableOpacity
              style={styles.contactsButton}
              onPress={() =>
                toggleModal(v.agency, v.phone, v.street, v.city, v.zip)
              }
            >
              <FontAwesomeIcon
                icon={faAddressBook}
                color="rgba(255,255,255,0.95)"
                size={22}
              />
            </TouchableOpacity>
          </View>
          <Divider
            style={{ height: 0.5, backgroundColor: "rgba(255,255,255,0.3)" }}
          />
        </React.Fragment>
      );
    });

  return (
    <ScrollView style={styles.scrollContainer}>
      {showModal && (
        <ContactsModal
          agency={currentAgency}
          showModal={showModal}
          toggleModal={toggleModal}
          currentPhone={currentPhone}
          currentStreet={currentStreet}
          currentCity={currentCity}
          currentZip={currentZip}
        />
      )}
      {agencyList}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  firstLetter: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  agencyName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactsButton: {
    position: "absolute",
    top: -5,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 20,
    backgroundColor: "rgb(40,75,220)",
  },
  container: {
    width: "95%",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
    paddingBottom: 5,
    position: "relative",
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
    paddingBottom: 100,
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
export default SearchResults;
