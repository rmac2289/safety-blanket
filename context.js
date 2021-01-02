import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};

export const LoadingContext = createContext();

export const LoadingContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export const StateContext = createContext();

export const StateContextProvider = (props) => {
  const [pressedState, setPressedState] = useState("");

  return (
    <StateContext.Provider value={[pressedState, setPressedState]}>
      {props.children}
    </StateContext.Provider>
  );
};
