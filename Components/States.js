import React, { useContext } from "react";
import { usStates } from "../services";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoadingContext, StateContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "react-native-elements";
const States = () => {
  const [pressedState, setPressedState] = useContext(StateContext);
  const [loading, setLoading] = useContext(LoadingContext);
  const navigation = useNavigation();

  const getDepts = (event) => {
    navigation.navigate("Search");
    setLoading(true);

    setPressedState(
      event._dispatchInstances.memoizedProps.children[0][0].props.value
    );
  };

  const stateList = usStates.map((state) => {
    return (
      <React.Fragment key={state.stateName}>
        <TouchableOpacity style={styles.button} onPress={getDepts}>
          <Text value={state.abbr} style={styles.text}>
            {state.stateName}
          </Text>
          <FontAwesomeIcon
            color="rgba(255,255,255,0.95)"
            icon={faChevronRight}
            size={15}
          />
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </React.Fragment>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>{stateList}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "rgb(40,75,220)",
  },
  text: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 21,
    fontWeight: "500",
  },
  listContainer: {
    width: "98%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 20,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 42,
    alignItems: "center",
    margin: 5,
    padding: 5,
    backgroundColor: "transparent",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.95)",
    position: "relative",
    borderBottomWidth: 1,
    paddingTop: 5,
  },
});
export default States;
