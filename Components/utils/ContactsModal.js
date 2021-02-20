import React, { useState, useContext } from "react";
import {
  TouchableHighlight,
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE } from "../graphql/Mutations";
import { GET_FAVORITES } from "../graphql/Queries";
import { UserIdContext } from "../../context";

export const ContactsModal = ({
  showModal,
  toggleModal,
  agency,
  currentPhone,
  currentStreet,
  currentCity,
  currentZip,
  buttonPressed,
  state,
}) => {
  const [added, setAdded] = useState(false);
  const [userId] = useContext(UserIdContext);

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
      await Contacts.addContactAsync(contact)
        .then(() => setAdded(true))
        .catch((err) => console.log(err));
    }
  };
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    refetchQueries: [{ query: GET_FAVORITES, variables: { userId: userId } }],
  });

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
          {!added ? (
            <>
              <Text style={styles.modalText}>
                Add <Text style={{ color: "rgb(40,75,220)" }}>{agency}</Text> to{" "}
                <Text style={{ fontWeight: "700" }}>{buttonPressed}</Text>?
              </Text>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "rgb(40,75,220)",
                }}
                onPress={
                  buttonPressed === "contacts"
                    ? addToContacts
                    : () =>
                        addFavorite(
                          {
                            variables: {
                              userId,
                              favorites: {
                                agency,
                                phone: currentPhone,
                                street: currentStreet,
                                city: currentCity,
                                state,
                                zip: parseInt(currentZip),
                              },
                            },
                          },
                          setAdded(!added)
                        )
                }
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
