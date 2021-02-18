import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAddressBook,
  faHeart,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, DELETE_FAVORITE } from "../graphql/Mutations";
import { UserIdContext } from "../../context";

const AgencyHeading = ({
  agency,
  phone,
  street,
  city,
  state,
  zip,
  favoritesPage,
  toggleModal,
}) => {
  const [userId] = useContext(UserIdContext);
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [deleteFavorite] = useMutation(DELETE_FAVORITE);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.firstLetter}>
        {agency.slice(0, 1)}
        <Text style={styles.text}>{agency.slice(1)}</Text>
      </Text>
      <View style={styles.favAndContacts}>
        <TouchableOpacity
          style={styles.contactsButton}
          onPress={() => toggleModal(agency, phone, street, city, zip)}
        >
          <FontAwesomeIcon
            icon={faAddressBook}
            color="rgb(40,75,220)"
            size={28}
          />
        </TouchableOpacity>

        {!favoritesPage ? (
          <TouchableOpacity
            style={styles.contactsButton}
            onPress={() =>
              addFavorite(
                {
                  variables: {
                    userId: userId,
                    favorites: { agency, phone, street, city, state, zip },
                  },
                },
                console.log(state)
              )
            }
          >
            <FontAwesomeIcon icon={faHeart} color="rgb(40,75,220)" size={28} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.contactsButton}
            onPress={() =>
              deleteFavorite(
                {
                  variables: {
                    userId: userId,
                    favorite: { agency, state },
                  },
                },
                console.log(agency)
              )
            }
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="rgb(40,75,220)"
              size={28}
            />
          </TouchableOpacity>
        )}
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
  firstLetter: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
    width: "65%",
  },
  contactsButton: {
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 44,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0.075)",
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
  },
});

export default AgencyHeading;
