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
import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";
import { LoadingContext } from "../context";
import Loading from "./Loading";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StateContext } from "../context";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [pressedState] = useContext(StateContext);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useContext(LoadingContext);
  const navigation = useNavigation();

  console.log(navigation);
  useEffect(() => {
    setLoading(false);
    navigation.setOptions({
      title: pressedState,
      headerTitleStyle: { fontSize: 22 },
      headerTitleContainerStyle: styles.headerTitleContainer,
      headerRightContainerStyle: styles.headerRightContainer,

      headerRight: () => (
        <FontAwesomeIcon
          color="rgba(255,255,255,0.95)"
          size="25x"
          onPress={() => navigation.navigate("Main")}
          icon={faHome}
        />
      ),
    });
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
    backgroundColor: "transparent",
    position: "relative",
    marginBottom: 10,
  },
  background: {
    paddingTop: 15,
    backgroundColor: "rgba(0,0,0,0.95)",
    height: Dimensions.get("window").height,
  },
  headerTitleContainer: {
    borderColor: "rgb(40,75,220)",
    borderWidth: 3,
    width: 60,
    height: 60,
    marginTop: 25,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  headerRightContainer: {
    padding: 12,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
