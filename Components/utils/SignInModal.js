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

  const [addUser, { data }] = useMutation(ADD_USER, {
    variables: {
      email: emailInput,
    },
  });
  const handleSubmit = async () => {
    await addUser().catch((e) => console.log(e));
    console.log(data);
    await AsyncStorage.setItem("userId", data.addUser.id);
    setUserId(data.addUser.id);
  };
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
          <Button onPress={handleSubmit} title="Submit" />
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
