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

  const getUser = async () => {
    // await AsyncStorage.clear();
    let existingUser = await AsyncStorage.getItem("userId");
    if (existingUser !== null) {
      setUserId(JSON.parse(existingUser));
    }
  };
  getUser();

  return (
    <UserIdContext.Provider value={[userId, setUserId]}>
      {props.children}
    </UserIdContext.Provider>
  );
};
