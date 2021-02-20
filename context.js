import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Random from "expo-random";

export const StateContext = createContext();
export const FavoritesContext = createContext();
export const UserIdContext = createContext();

export const StateContextProvider = (props) => {
  const [pressedState, setPressedState] = useState("");
  return (
    <StateContext.Provider value={[pressedState, setPressedState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export const UserIdContextProvider = (props) => {
  const [userId, setUserId] = useState("");

  // const removeId = async () => {
  //   return await AsyncStorage.removeItem("user");
  // };
  // const clearAsync = async () => {
  //   setUserId("");
  //   return await AsyncStorage.clear();
  // };
  const getUniqueId = async () => {
    let user;
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      user = await AsyncStorage.getItem("user");
      if (user === null || !keys.includes("user")) {
        const uniqueId = JSON.stringify(Random.getRandomBytes(128).join(""));
        setUserId(uniqueId);
        return await AsyncStorage.setItem("user", uniqueId);
      } else {
        let existingUser = await AsyncStorage.getItem("user");
        setUserId(JSON.parse(existingUser));
      }
    } catch (e) {
      console.log(e);
    }
  };
  getUniqueId();
  return (
    <UserIdContext.Provider value={[userId, setUserId]}>
      {props.children}
    </UserIdContext.Provider>
  );
};
