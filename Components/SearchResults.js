import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AgencyHeading from "./utils/AgencyHeading";
import Loading from "./utils/Loading";
import { alphaSort } from "../services";
import CallOrMap from "./utils/CallOrMap";
import { Divider } from "react-native-elements";
import ConfirmModal from "./utils/ConfirmModal";
import { useQuery } from "@apollo/client";
import { DEPTS_BY_STATE } from "./graphql/Queries";

const SearchResults = (props) => {
  const [currentPhone, setPhone] = useState("");
  const [currentStreet, setStreet] = useState("");
  const [currentCity, setCity] = useState("");
  const [currentZip, setZip] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAgency, setCurrentAgency] = useState("");
  const [buttonPressed, setButtonPressed] = useState("");
  const [state, setState] = useState("");

  const { loading, error, data } = useQuery(DEPTS_BY_STATE, {
    variables: { state: `${props.state}` },
  });

  const toggleModal = (current, phone, street, city, zip, state, string) => {
    setShowModal(!showModal);
    setCurrentAgency(current);
    setPhone(phone);
    setStreet(street);
    setCity(city);
    setZip(`${zip}`);
    setState(state);
    string === "favorites"
      ? setButtonPressed("favorites")
      : setButtonPressed("contacts");
  };

  if (loading) return <Loading initialLoad={false} message="Loading" />;
  const allAgencies = [...data.agencies_by_state];
  const agencyList = allAgencies
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
            <AgencyHeading
              agency={v.agency}
              phone={v.phone}
              street={v.street}
              city={v.city}
              state={v.state}
              zip={v.zip}
              toggleModal={toggleModal}
            />
            <CallOrMap
              phone={v.phone}
              street={v.street}
              city={v.city}
              state={v.state}
              zip={v.zip}
            />
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
        <ConfirmModal
          state={state}
          buttonPressed={buttonPressed}
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
  agencyName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  scrollContainer: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
  },
});
export default SearchResults;
