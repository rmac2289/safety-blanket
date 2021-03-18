<<<<<<< HEAD
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
=======
import React, { useContext, useState } from "react";
import { Modal, Text, View, TextInput, StyleSheet, Button } from "react-native";
import { ADD_USER } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserIdContext } from "../../context";

const SignInModal = () => {
  const [emailInput, setEmailInput] = useState("");
  const [userId, setUserId] = useContext(UserIdContext);

  console.log(userId);

>>>>>>> 64a79fdd2d96bedbe13d17122d0df4a7fe841f33
  const [addUser, { data }] = useMutation(ADD_USER, {
    variables: {
      email: emailInput,
    },
<<<<<<< HEAD
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_USER, variables: { email: emailInput } }],
  });

=======
  });
  const handleSubmit = async () => {
    await addUser().catch((e) => console.log(e));
    console.log(data);
    await AsyncStorage.setItem("userId", data.addUser.id);
    setUserId(data.addUser.id);
  };
>>>>>>> 64a79fdd2d96bedbe13d17122d0df4a7fe841f33
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
<<<<<<< HEAD
          <Button onPress={addUser} title="Submit" />
=======
          <Button onPress={handleSubmit} title="Submit" />
>>>>>>> 64a79fdd2d96bedbe13d17122d0df4a7fe841f33
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
