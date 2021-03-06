import React, { useContext, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { UserIdContext } from "../context";
import { Divider } from "react-native-elements";
import { GET_FAVORITES } from "./graphql/Queries";
import { useQuery } from "@apollo/client";
import CallOrMap from "./utils/CallOrMap";
import AgencyHeading from "./utils/AgencyHeading";
import ConfirmModal from "./utils/ConfirmModal";
import { alphaSort } from "../services";
import * as Animatable from "react-native-animatable";

const Favorites = () => {
  const [currentPhone, setPhone] = useState("");
  const [currentStreet, setStreet] = useState("");
  const [currentCity, setCity] = useState("");
  const [currentZip, setZip] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAgency, setCurrentAgency] = useState("");
  const [userId, setUserId] = useContext(UserIdContext);

  const toggleModal = (current, phone, street, city, zip) => {
    setShowModal(!showModal);
    setCurrentAgency(current);
    setPhone(phone);
    setStreet(street);
    setCity(city);
    setZip(`${zip}`);
  };
  const { loading, data } = useQuery(GET_FAVORITES, {
    variables: {
      userId: userId,
    },
  });

  const favList = data?.favorites
    .slice()
    .sort(alphaSort)
    .map((v, i) => {
      return (
        <React.Fragment key={`${v.agency}${(i * 100) % 30}`}>
          <Animatable.View animation="fadeInUp" style={styles.container}>
            <AgencyHeading
              agency={v.agency}
              phone={v.phone}
              street={v.street}
              city={v.city}
              state={v.state}
              zip={v.zip}
              toggleModal={toggleModal}
              favoritesPage={true}
            />
            <CallOrMap
              phone={v.phone}
              street={v.street}
              city={v.city}
              state={v.state}
              zip={v.zip}
            />
          </Animatable.View>
          <Divider
            style={{ height: 0.5, backgroundColor: "rgba(255,255,255,0.3)" }}
          />
        </React.Fragment>
      );
    });
  return (
    <ScrollView style={styles.background}>
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
      {favList}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingTop: 15,
    backgroundColor: "rgba(0,0,0,0.95)",
    height: Dimensions.get("window").height,
  },
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
  deleteButton: {
    position: "absolute",
    top: -5,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

export default Favorites;
