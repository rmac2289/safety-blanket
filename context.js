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

export const StateContext = createContext();

export const StateContextProvider = (props) => {
  const [pressedState, setPressedState] = useState("");

  return (
    <StateContext.Provider value={[pressedState, setPressedState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export const FavoritesContext = createContext();

export const FavoritesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      {props.children}
    </FavoritesContext.Provider>
  );
};
