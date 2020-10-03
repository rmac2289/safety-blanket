import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.search}>
        Search for a munipality by name or location
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setSearchText(text)}
        vale={searchText}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  search: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
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
    height: 30,
    width: 100,
    backgroundColor: "black",
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
});

export default Search;
