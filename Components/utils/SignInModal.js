import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { ADD_USER } from "../graphql/Mutations";
import { GET_USER } from "../graphql/Queries";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInModal = () => {
  const [emailInput, setEmailInput] = useState("");
  const [addUser, { data }] = useMutation(ADD_USER, {
    variables: {
      email: emailInput,
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_USER, variables: { email: emailInput } }],
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Please Sign in</Text>
          <TextInput
            value={emailInput}
            onChangeText={(text) => setEmailInput(text)}
            style={styles.input}
          />
          <Button onPress={addUser} title="Submit" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 225,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
  },
});

export default SignInModal;
