import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import SearchResults from "../Components/SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <FontAwesomeIcon style={styles.icon} icon={faSearch} />
          <TextInput
            placeholder="search by department name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.textInput}
            onChangeText={(text) => setSearchText(text)}
            vale={searchText}
          />
        </View>
      </View>
      {searchText !== "" && (
        <ScrollView style={styles.listBox}>
          <SearchResults searchText={searchText} />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    borderWidth: 2,
    borderColor: "rgb(0,0,0)",
    marginLeft: 0,
    marginRight: "auto",
    padding: 10,
    borderRadius: 20,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: 25,
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
    fontSize: 22,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.3)",
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
