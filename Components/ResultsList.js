import React from "react";
import { Agencies } from "../Data";
import { View, Text, ScrollView } from "react-native";

const ResultsList = (props) => {
  const formatPhoneNum = (number) => {
    return `(${number[0]}${number[1]}${number[2]}) ${number[3]}${number[4]}${number[5]}-${number[6]}${number[7]}${number[8]}${number[9]}`;
  };

  const agencyList = Agencies.filter(
    (v) => v.city.includes(props.city) || v.agency.includes(props.county)
  );
  const agencyDisplay = agencyList.map((v) => (
    <View lines="full" color="light" key={v.agency}>
      <Text>{v.agency}</Text>
      <Text>Call Now: {formatPhoneNum(v.phone)}</Text>
      <Text>
        Location: {v.street}, {v.city}, {v.state}, {v.zip}
      </Text>
    </View>
  ));
  console.log(agencyDisplay);

  return <ScrollView>{agencyDisplay}</ScrollView>;
};

export default ResultsList;
