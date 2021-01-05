import React, { useState } from "react";
import {
  TouchableHighlight,
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";

export const ContactsModal = ({
  showModal,
  toggleModal,
  agency,
  currentPhone,
  currentStreet,
  currentCity,
  currentZip,
}) => {
  const [contactAdded, setContactAdded] = useState(false);
  const addToContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const contact = {
        [Contacts.Fields.FirstName]: agency,
        [Contacts.Fields.PhoneNumbers]: [{ number: currentPhone }],
        [Contacts.Fields.Addresses]: [
          {
            street: currentStreet,
            city: currentCity,
            postalCode: currentZip,
          },
        ],
      };
      console.log(contact);
      await Contacts.addContactAsync(contact)
        .then(() => setContactAdded(true))
        .catch((err) => console.log(err));
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!contactAdded ? (
            <>
              <Text style={styles.modalText}>
                Add <Text style={{ color: "rgb(40,75,220)" }}>{agency}</Text> to
                contacts?
              </Text>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "rgb(40,75,220)",
                }}
                onPress={addToContacts}
              >
                <Text style={styles.textStyle}>Add</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "rgba(220,0,0,0.75)",
                }}
                onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </>
          ) : (
            <>
              <Text style={styles.addedText}>Added!</Text>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "rgb(40,75,220)",
                }}
                onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "rgb(40,75,220)",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 5,
    width: 250,
    height: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  addedText: {
    fontSize: 20,
    textAlign: "center",
    color: "green",
    fontWeight: "600",
  },
});
export default ContactsModal;
