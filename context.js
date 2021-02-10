import React, { createContext, useState } from "react";

export const StateContext = createContext();
export const FavoritesContext = createContext();

export const StateContextProvider = (props) => {
  const [pressedState, setPressedState] = useState("");
  return (
    <StateContext.Provider value={[pressedState, setPressedState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export const FavoritesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      {props.children}
    </FavoritesContext.Provider>
  );
};
