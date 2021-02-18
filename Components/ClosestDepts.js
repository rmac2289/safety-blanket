import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CallOrMap from "./utils/CallOrMap";
import { Divider } from "react-native-elements";
import { useQuery } from "@apollo/client";
import { DEPTS_BY_CITY } from "./graphql/Queries";
import AgencyHeading from "./utils/AgencyHeading";
import ContactsModal from "./utils/ContactsModal";

const ClosestDepts = (props) => {
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
  const filterAgencies = (v) => {
    return (
      (v.city === props.city && v.state === props.state) ||
      (v.agency.includes(props.county) && !v.agency.includes("(")) ||
      ((v.agency.includes("State") || v.agency.includes("Highway")) &&
        v.state === props.state)
    );
  };

  // ***** get this working to eliminate filtering ******
  // const { data } = useQuery(DEPTS_BY_CITY, {
  //   variables: {
  //     city: props.city,
  //     county: props.county,
  //     state: props.state,
  //   },
  // });
  // console.log(data);

  const agencyList = props.data.agencies.filter(filterAgencies);

  const displayedAgencies = agencyList.map((v) => {
    v.zip.length === 4 ? (v.zip = `0${v.zip}`) : null;
    return (
      <React.Fragment key={v.agency}>
        <View style={styles.container}>
          {v.agency.includes("State") ||
            (v.agency.includes("Highway") && (
              <Text style={styles.hwyText}>On a state highway?</Text>
            ))}
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
        <Divider style={styles.divider} />
      </React.Fragment>
    );
  });
  return (
    <ScrollView style={styles.scrollView}>
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
      {displayedAgencies}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
    paddingBottom: 5,
  },

  scrollView: {
    marginBottom: 20,
  },
  hwyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgb(18,115,221)",
    marginBottom: 5,
    textAlign: "left",
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 0.5,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    color: "rgba(255,255,255,0.9)",
  },
});

export default ClosestDepts;
