import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAddressBook,
  faHeart,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { DELETE_FAVORITE } from "../graphql/Mutations";
import { GET_FAVORITES } from "../graphql/Queries";
import { UserIdContext } from "../../context";

const AgencyHeading = ({ agency, state }) => {
  const [userId] = useContext(UserIdContext);

  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    refetchQueries: [{ query: GET_FAVORITES, variables: { userId: userId } }],
  });
  const confirmDelete = () =>
    Alert.alert(`Delete ${agency} from favorites?`, "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () =>
          deleteFavorite({
            variables: {
              userId: userId,
              favorite: { agency, state },
            },
          }),
        style: "destructive",
      },
    ]);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>{agency}</Text>
      <View style={styles.favAndContacts}>
        {/* {!favoritesPage ? (
          <TouchableOpacity
            style={styles.contactsButton}
            onPress={() =>
              toggleModal(agency, phone, street, city, zip, state, "favorites")
            }
          >
            <FontAwesomeIcon icon={faHeart} color="rgb(40,75,220)" size={28} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.contactsButton}
            onPress={confirmDelete}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="rgb(40,75,220)"
              size={28}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favAndContacts: {
    top: -4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "35%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 62,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgb(255,255,255)",
  },
});

export default AgencyHeading;
