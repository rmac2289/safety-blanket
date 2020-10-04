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

const Search = (props) => {
  const [showResults, setShowResults] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleShowResults = () => {
    if (searchText === "") {
      setShowResults(false);
    } else {
      return setShowResults(!showResults);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.search}>Search for a municipality by name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setSearchText(text)}
          vale={searchText}
        />
        <TouchableOpacity
          onPress={() => toggleShowResults()}
          style={styles.button}
        >
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
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
  container: {
    height: 200,
  },
  search: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    height: 35,
    fontSize: 22,
    padding: 1,
  },
  button: {
    padding: 10,
    width: 100,
    backgroundColor: "black",
    borderWidth: 3,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
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
