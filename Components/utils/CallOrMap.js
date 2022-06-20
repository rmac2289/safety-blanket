import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { openPhone, openMaps } from "../../services";
import * as Contacts from "expo-contacts";

const CallOrMap = ({
  phone,
  street,
  city,
  state,
  zip,
  agency,
  toggleModal,
}) => {
  // TODO: Fix contacts error on save
  const contactsAlert = () => {
    Alert.alert(`Add ${agency} to contacts?`, "", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === "granted") {
            const contact = {
              [Contacts.Fields.FirstName]: agency,
              [Contacts.Fields.PhoneNumbers]: [{ number: phone }],
              [Contacts.Fields.Addresses]: [
                {
                  street: street,
                  city: city,
                  postalCode: zip,
                },
              ],
            };
            console.log(contact);
            await Contacts.addContactAsync(contact).catch((err) =>
              console.log(err)
            );
          }
        },
      },
    ]);
  };
  const mapsAlert = () =>
    Alert.alert("Open in maps?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => openMaps(street, city, state, zip) },
    ]);
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.contactsButton}
        onPress={() => contactsAlert()}
      >
        <FontAwesomeIcon
          icon={faAddressBook}
          color="rgb(40,75,220)"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => mapsAlert()}
        // onPress={() => openMaps(street, city, state, zip)}
        style={styles.mapsButton}
      >
        <FontAwesomeIcon style={styles.icon} icon={faMapMarkerAlt} size={25} />
        {/* <Text style={styles.buttonText}>Open Google Maps</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={() => openPhone(phone)}
      >
        <FontAwesomeIcon style={styles.icon} icon={faPhone} size={25} />

        {/* <Text style={styles.buttonText}>{formatPhoneNum(phone)}</Text> */}
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
    width: 65,
    marginLeft: 5,
    height: 55,
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
    height: 55,
    flex: 0.75,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  contactsButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    height: 55,
    flex: 0.75,
    marginRight: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default CallOrMap;
