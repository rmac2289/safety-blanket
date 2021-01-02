import React, { useContext } from "react";
import { usStates } from "../services";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StateContext } from "../context";

const States = () => {
  const [pressedState, setPressedState] = useContext(StateContext);
  const navigation = useNavigation();

  const getDepts = (event) => {
    navigation.navigate("Search");
    setPressedState(
      event._dispatchInstances.memoizedProps.children[0].props.value
    );
  };

  const stateList = usStates.map((state) => {
    return (
      <TouchableOpacity style={styles.button} onPress={getDepts}>
        <Text value={state.abbr} style={styles.text}>
          {state.stateName}
        </Text>
      </TouchableOpacity>
    );
  });

  return <ScrollView style={styles.container}>{stateList}</ScrollView>;
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
  },
  button: {
    height: 25,
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.95)",
    position: "relative",
    borderBottomWidth: 1,
  },
});
export default States;
