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
    width: "95%",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 25,
  },
  search: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  icon: {
    color: "rgba(0,0,0,0.5)",
    width: "8%",
  },
  textInput: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    fontSize: 22,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0,0,0,0.1)",
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
