import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
} from "react-native";
import SearchResults from "../Components/SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LoadingContext } from "../context";
import Loading from "./Loading";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StateContext } from "../context";

const Search = () => {
  const [pressedState, setPressedState] = useContext(StateContext);
  console.log(pressedState);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useContext(LoadingContext);

  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return <Loading initialLoad={false} message="Loading" />;
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <FontAwesomeIcon style={styles.icon} icon={faSearch} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="rgba(255,255,255,0.65)"
              style={styles.textInput}
              onChangeText={(text) => setSearchText(text)}
              vale={searchText}
            />
          </View>
        </View>
        <ScrollView style={styles.listBox}>
          <SearchResults state={pressedState} searchText={searchText} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.95)",
    position: "relative",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  background: {
    paddingTop: 15,
    backgroundColor: "rgba(0,0,0,0.95)",
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    width: "90%",
    marginRight: "auto",
    padding: 10,
    borderRadius: 20,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  icon: {
    color: "rgb(255,255,255)",
    width: "8%",
  },
  textInput: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    color: "white",
    fontSize: 18,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.5)",
    width: "92%",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  listBox: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 75,
  },
});

export default Search;
