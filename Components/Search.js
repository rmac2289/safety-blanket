import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SearchResults from "../Components/SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GET_AGENCIES } from "./ClosestDepts";
import { useQuery } from "@apollo/client";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const { loading, data } = useQuery(GET_AGENCIES);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={loading ? styles.backgroundLoading : styles.background}
    >
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color="white"
            size="large"
            style={styles.spinner}
          />
        </View>
      ) : (
        <>
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
            <SearchResults data={data.agencies} searchText={searchText} />
          </ScrollView>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    position: "relative",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  spinner: {
    position: "absolute",
    bottom: 75,
  },
  loading: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  background: {
    paddingTop: 15,
    backgroundColor: "black",
    height: Dimensions.get("window").height,
  },
  backgroundLoading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
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
  },
});

export default Search;
